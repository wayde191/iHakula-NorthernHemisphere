(ns utils.http
  (:require [clj-http.client :refer [missing? parse-url]]
            [clj-time.format :as dtf]
            [clojure.walk :as walk]
            [clojure.stacktrace :as stacktrace]))

(defn json-dates->dates
  [m req]
  (let [{:keys [json-dates]} req
        f (fn [[k v]]
            (if (some (partial = k) json-dates) [k (dtf/parse v)] [k v]))]
    (walk/postwalk (fn [x] (if (map? x) (into {} (map f x)) x)) m)))

(defn hyphenate-keys
  [m _]
  (defn underscore->hyphen [k]
    (-> k
      name
      (clojure.string/replace #"_" "-")
      keyword))
  (let [f (fn [[k v]] (if (keyword? k) [(underscore->hyphen k) v] [k v]))]
    (walk/postwalk (fn [x] (if (map? x) (into {} (map f x)) x)) m)))

(defn wrap-json-post-parser [client]
  (fn [req]
    (let [{:keys [as json-post-parsers]} req
          {:keys [body] :as resp} (client req)]
      (if (and body (= as :json))
        (assoc resp :body ((apply comp json-post-parsers) body req))
        resp))))

(defn wrap-jigsaw-token
  "Middleware converting the :jigsaw-token option into an Authorization header."
  [client]
  (fn [req]
    (if-let [jigsaw-token (:jigsaw-token req)]
      (client (-> req (dissoc :jigsaw-token)
                  (assoc-in [:headers "authorization"]
                            (str "Token " jigsaw-token))))
      (client req))))

(defn wrap-not-found
  "Middleware ignoring 404s when the :ignore-not-found? option
  is set."
  [client]
  (fn [{:keys [ignore-not-found?] :as req}]
    (try
      (client req)
      (catch Exception e
        (if (missing? (-> e ex-data :object))
          (when-not ignore-not-found?
            (throw (stacktrace/root-cause e)))
          (throw (stacktrace/root-cause e)))))))

(defn join-uris [x y]
  (clojure.string/join "" (remove empty? [x y])))

(defn base-url
  "Middleware allows seperate base-url and relative uri"
  [client]
  (fn [request]
    (let [parsed (parse-url (:base-url request))]
      (client (-> parsed
                  (merge request)
                  (update-in [:uri] (partial join-uris (:uri parsed))))))))
