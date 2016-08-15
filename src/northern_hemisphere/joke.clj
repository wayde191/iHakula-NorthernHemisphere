(ns northern-hemisphere.joke
  (:require [northern-hemisphere.http :as http]
            [northern-hemisphere.reports :as reports]
            [clojure.tools.logging :as log]
            [pl.danieljanus.tagsoup :as html-parser]))

(defn login [username token]
  (http/request-post
    (:uri (reports/sso-login))
    (merge
      {:sCode reports/sso-security-code}
      {:ihakulaID username :token token})))

(defn refresh-joke []
  (log/info "Refreshing jokes...")
  (println (get-in (html-parser/parse reports/joke-url) [3 2])))


  ;  (println (http/request-get reports/joke-url {:good "for you"})))

(defn getContact [user-id]
  (http/request-get
    (:uri (reports/get-user-contact))
    (merge
      {:sCode reports/sso-security-code}
      {:user_id user-id})))