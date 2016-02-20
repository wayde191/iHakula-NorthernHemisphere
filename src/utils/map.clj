(ns utils.map
  (:require [clojure.core.incubator :refer [dissoc-in]]
            [clojure.string :as str]
            [clojure.set :refer [intersection]]
            [clj-time.core :as t]
            [clj-time.coerce :as c]))

(defn- match-criteria [criteria item]
  (= criteria (select-keys item (keys criteria))))

(defn filter-similar [criteria xs]
  (filter (partial match-criteria criteria) xs))

(defn find-similar [criteria xs]
  (first (filter-similar criteria xs)))

(defn map-val [f m]
  (into {} (map (fn [[k v]] {k (f v)}) m)))

(defn group-by-keys [m keys val-fn]
  (let [by-keys (group-by #(map % keys) m)
        mapped (map-val val-fn by-keys)]
    (reduce #(assoc-in %1 (key %2) (val %2)) {} mapped)))

(defn flatten-keys
  ([m] (set (flatten-keys m [])))
  ([m ks]
     (let [[vals-are-map vals-are-val] (split-with #(map? (val %)) m)]
       (concat
        (mapcat #(flatten-keys (val %) (conj ks (key %))) vals-are-map)
        (map #(conj ks (key %)) vals-are-val)))))

(defn filter-keys [pred xs]
  (let [keys-not-wanted (remove #(apply pred %) (flatten-keys xs))]
    (reduce dissoc-in xs keys-not-wanted)))

(defn capitalize-key [key]
  (->> (str/split (name key) #"-")
       (str/join " ")
       (str/capitalize)))

(defn map-aggregator [[k v] merge-fn keys]
  (merge k (apply merge-with merge-fn (map #(apply dissoc % keys) v))))

(defn group-and-merge [keys merge-fn coll]
  (->> coll
       (group-by #(select-keys % keys))
       (map #(map-aggregator % merge-fn keys))))

(defn hash->table
  ([columns default-value xs]
   (hash->table columns default-value capitalize-key xs))
  ([columns default-value headerfn xs]
   (if (map? columns)
     (hash->table (keys columns) default-value columns xs)
     (let [newheader (into [] (map #(headerfn %) columns))
           rows (mapv (fn [entry]
                        (let [values (mapv entry columns)]
                          (into [] (map #(if (nil? %)
                                           default-value
                                           %) values)))) xs)]
       (cons newheader rows)))))

(defn sort-by-date [data]
  (sort-by #(c/to-local-date (->> (:global %)
                                  (first)
                                  (:monthend)))
           t/after? data))

(defn- is-empty [plan]
  (or (nil? plan) (empty? plan)))

(defn outer-join
  ([coll1 coll2]
   (defn keys-set [coll]
     (into #{} (keys (first coll))))

   (let [keys1 (keys-set coll1)
         keys2 (keys-set coll2)
         common-keys (intersection keys1 keys2)]
     (outer-join coll1 coll2 common-keys)))

  ([coll1 coll2 join-keys]
   (let [joined-data (->> (concat coll1 coll2)
                          (group-by #(select-keys % join-keys))
                          (map (fn [[k v]]
                                 (apply merge v))))]
     (if (is-empty coll1) coll2
         (if (is-empty coll2) coll1 joined-data)))))

(defn update-ks [m ks f]
  (reduce (fn [x k]
            (if (contains? x k)
              (update-in x [k] f)
              x))
          m ks))
