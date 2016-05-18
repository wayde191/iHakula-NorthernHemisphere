(ns northern-hemisphere.http
  (:require [clj-http.client :as client]
            [clj-http-s3.middleware :as s3-middleware]
            [utils.http :as middleware]))

(defn http [request]
  (client/with-middleware (conj client/default-middleware
                            #'middleware/wrap-not-found
                            #'middleware/wrap-json-post-parser
                            #'s3-middleware/wrap-aws-s3-auth
                            #'s3-middleware/wrap-request-date
                            #'s3-middleware/wrap-aws-credentials
                            #'middleware/base-url)
    (:body (client/request (merge request
                             {:json-post-parsers [middleware/json-dates->dates]})))))

(defn request-get [url params]
  (:body
    (client/get url {:query-params params})))

(defn request-post [url params]
  (:body
    (client/post url {:form-params params})))
