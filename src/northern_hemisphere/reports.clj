(ns northern-hemisphere.reports
  (:require [clojure.string :refer [join]]))

(def environment (if-let [environment (System/getenv "GO_PIPELINES_ENV")]
                   (System/getenv "GO_PIPELINES_ENV")
                   "dev"))

(def host-dev "http://localhost/")

(def host-prod "http://www.ihakula.com/")

(def sso-security-code "iHakulaSecurityCode2016")

(defn get-host []
  (if (= environment "dev") host-dev host-prod))

(defn sso-login []
  {:uri (join [(get-host) "sso/api/index.php/ihuser/login"])})

(defn reports-http []
  (println "fake"))
