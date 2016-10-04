(ns northern-hemisphere.wordpress
  (:require [northern-hemisphere.http :as http]
            [northern-hemisphere.reports :as reports]
            [clojure.tools.logging :as log]
            [pl.danieljanus.tagsoup :as html-parser]))

(defn get-post [category filter]
  (http/request-get
    (:uri (reports/get-no1-url))
    (merge
      {:category category
       :filter filter})))

(defn get-post-count []
  (http/request-get
    (:uri (reports/get-no1-post-count-url))
    (merge {})))

(defn get-post-by-page [page]
  (http/request-get
    (:uri (reports/get-no1-post-by-page-url))
    (merge
      {:page page})))

(defn get-comment [post-id]
  (http/request-get
    (:uri (reports/get-no1-comment-url))
    (merge
      {:post_id post-id})))