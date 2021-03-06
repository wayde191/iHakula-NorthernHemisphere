(ns northern-hemisphere.api
  (:require [northern-hemisphere.mysql :as mysql]
            [northern-hemisphere.user :as user]
            [northern-hemisphere.datetime :as datetime]
            [northern-hemisphere.user :as user]
            [northern-hemisphere.joke :as joke]
            [northern-hemisphere.wordpress :as wordpress]
            [utils.map :refer [filter-keys flatten-keys]]
            [clj-time.core :refer [year month date-time plus minus months interval within?]]
            [compojure.core :refer [defroutes GET POST context] :as compojure]
            [compojure.handler :as handler]
            [clojure.data.json :as json]
            [clj-http.client :as client]
            [clj-time.format :as format]
            [clj-time.coerce :refer [to-local-date]]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.response :refer [redirect response charset header]]
            [utils.ring-csv :refer [wrap-csv-response]]
            [clojure.string :refer [capitalize lower-case split]])
  (:import [java.util TimeZone]
           [utils manifest]))

(defn routes [reports-get current-user]
  (cheshire.generate/add-encoder org.joda.time.base.BaseDateTime cheshire.generate/encode-str)

  (letfn [(merge-header [response] (header response "Content-Type" "text/json; charset=utf-8"))]
    (handler/api
      (compojure/routes
        (wrap-json-response
          (defroutes json-routes
            (GET "/date.json" req (response {:date (datetime/midnight)}))
            (GET "/products.json" req (response (mysql/list-users 'hello')))
            (GET "/:username/:token/user.json" [username token]
              (response (user/login username token)))
            (GET "/:username/:token/isUserLoggedIn.json" [username token]
              (response (user/isUserLoggedIn username token)))
            (GET "/:id/contact.json" [id]
              (response (user/getContact id)))
            (GET "/:number/joke.json" [number]
              (header (response (joke/get-joke number)) "Content-Type" "text/json; charset=utf-8"))

;            ===================================
;            wordpress
            (GET "/:category/:filter/post.json" [category filter]
              (merge-header (response (wordpress/get-post category filter))))
            (GET "/:page/post.json" [page]
              (merge-header (response (wordpress/get-post-by-page page))))
            (GET "/:id/single-post.json" [id]
              (merge-header (response (wordpress/get-post-by-id id))))
            (GET "/post-count.json" [page]
              (merge-header (response (wordpress/get-post-count))))
            (GET "/:postId/comment.json" [postId]
              (merge-header (response (wordpress/get-comment postId))))
            (POST "/message.json" req
              (merge-header (response {:value 'good'})))

            (GET "/neighbour.json" []
              (merge-header (response (wordpress/get-neighbour))))
          ))))
    )
  )