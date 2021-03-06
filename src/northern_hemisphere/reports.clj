(ns northern-hemisphere.reports
  (:require [clojure.string :refer [join]]))

(def environment (if-let [environment (System/getenv "GO_PIPELINES_ENV")]
                   (System/getenv "GO_PIPELINES_ENV")
                   "dev"))

(def host-dev "http://localhost/")

(def host-prod "http://www.ihakula.com/")

(def sso-security-code "iHakulaSecurityCode2016")

(def joke-url "http://joke.sina.cn/")

(defn get-host []
  (if (= environment "dev") host-dev host-prod))

(defn sso-login []
  {:uri (join [(get-host) "sso/api/index.php/ihuser/login"])})

(defn sso-isUserLoggedin []
  {:uri (join [(get-host) "sso/api/index.php/ihuser/isLoggedIn"])})


(def host-api-dev "http://localhost:9395/")

(def host-api-prod "http://www.ihakula.com:9395/")

(defn get-api-host []
  (if (= environment "dev") host-api-dev host-api-prod))

(defn get-user-contact []
  {:uri (join [(get-api-host) "user/get-contact"])})

(defn get-joke-url []
  {:uri (join [(get-api-host) "joke/get-joke"])})

(defn get-no1-url []
  {:uri (join [(get-api-host) "wordpress/get-post"])})

(defn get-no1-post-count-url []
  {:uri (join [(get-api-host) "wordpress/get-post-count"])})

(defn get-no1-post-by-page-url []
  {:uri (join [(get-api-host) "wordpress/get-post-by-page"])})

(defn get-no1-post-by-id-url []
  {:uri (join [(get-api-host) "wordpress/get-post-by-id"])})

(defn get-no1-comment-url []
  {:uri (join [(get-api-host) "wordpress/get-comment"])})

(defn get-no1-neighbour-url []
  {:uri (join [(get-api-host) "tool/get-validated-neighbours"])})

(defn reports-http []
  (println "fake"))
