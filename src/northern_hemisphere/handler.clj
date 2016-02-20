(ns northern-hemisphere.handler
  (:require [northern-hemisphere.system :as system]
            [northern-hemisphere.fakes-handler :refer :all]
            [northern-hemisphere.reports :as reports]
            [compojure.core :refer :all]
            [compojure.handler :as handler]
            [compojure.route :as route]
            [environ.core  :refer [env]]
            [ring.util.response :as response]
            [ring.middleware.json :refer [wrap-json-response]]
            [clj-time.format :refer [formatter unparse]]
            [clojure.string :refer [split]]
            [net.cgrand [enlive-html :as enlive]
             [jsoup :as jsoup]])

  (:import [java.util TimeZone]
           [utils manifest]))

(defn- reports-get [config]
  (partial reports/reports-http
    {:base-url (config :reports-api)}))

(defn enabled-features []
  (if-let [features (env :the-numbers-enable-features)]
    (split features  #":")
    []))

(defn piwik-host []
  (env :piwik-host))

(defn sales-funnel-url []
  (env :sales-funnel-url))

(defn accounts-service-url []
  (env :accounts-service-url))

(defn okta-url []
  (env :okta-url))

(defn application-name []
  (env :application-name))

(defn update-attr [attr f & args]
  (fn [node]
    (apply update-in node [:attrs attr] f args)))

(defn append-attr [attr & args]
  (apply update-attr attr str args))

(def local-css?
  (enlive/pred #(.startsWith (get-in % [:attrs :href]) "/css")))

(def local-javascript?
  (enlive/pred #(.startsWith (get-in % [:attrs :src]) "/javascript")))

(defn append-version [attr]
  (append-attr attr (str "?" (manifest/implementationVersion))))

(def append-resources
  (enlive/transformation
    [[:script local-javascript?]]
    (append-version :src)
    [[:link local-css?]]
    (append-version :href)))

(enlive/set-ns-parser! jsoup/parser)

(enlive/deftemplate index-template "public/index.html" []
  append-resources)

(defroutes main-routes
  (GET "/" [] (-> (response/response (apply str (index-template)))))
  (GET "/index.html" [] (response/redirect "/"))
  )

(defn app-routes [reports-get current-user forecast-shrinkage-percentage]
  (routes
    (handler/site main-routes)
    ))

(defroutes public-routes
  (GET "/favicon.ico" [] (response/resource-response "/favicon.ico" {:root "public/images"}))
  (handler/site (route/resources "/css" {:root "public/css"}))
  (handler/site (route/resources "/fonts" {:root "public/fonts"}))
  (handler/site (route/resources "/javascript" {:root "public/javascript"}))
  )

(defn ring-app [{current-user :current-user
                 forecast-shrinkage-percentage :forecast-shrinkage-percentage
                 config :config}]
  (TimeZone/setDefault (TimeZone/getTimeZone "UTC"))
  (handler/site
    (routes
      public-routes
      (app-routes (reports-get config) current-user forecast-shrinkage-percentage)
      (handler/site (route/not-found "Not Found")))))

(def app
  (ring-app system/system))
