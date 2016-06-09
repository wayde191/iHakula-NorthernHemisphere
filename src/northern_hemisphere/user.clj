(ns northern-hemisphere.user
  (:require [northern-hemisphere.http :as http]
            [northern-hemisphere.reports :as reports]))

(defn login [username token]
  (http/request-post
    (:uri (reports/sso-login))
    (merge
      {:sCode reports/sso-security-code}
      {:ihakulaID username :token token})))

(defn isUserLoggedIn [username token]
  (http/request-post
    (:uri (reports/sso-isUserLoggedin))
    (merge
      {:sCode reports/sso-security-code}
      {:user-id username :token token})))

(defn getContact [user-id]
  (http/request-get
    (:uri (reports/get-user-contact))
    (merge
      {:sCode reports/sso-security-code}
      {:user_id user-id})))