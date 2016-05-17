(ns northern-hemisphere.user
  (:require [northern-hemisphere.http :as http]
            [northern-hemisphere.reports :as reports]))

(defn login [username token]
  (http/request-post
    (:uri (reports/sso-login))
    (merge
      {:sCode reports/sso-security-code}
      {:ihakulaID username :token token})))