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
  (env :PIWIK_HOST))

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

(enlive/deftemplate production-template "public/production/index.html" []
  append-resources)

(defroutes main-routes
  (GET "/productions.html" [] (-> (response/response (apply str (production-template)))))
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
  (handler/site (route/resources "/utilisation/javascript" {:root "public/utilisation/javascript"}))
  (handler/site (route/resources "/revenue/javascript" {:root "public/revenue/javascript"}))
  (handler/site (route/resources "/invoice/javascript" {:root "public/invoice/javascript"}))
  (handler/site (route/resources "/headcount/javascript" {:root "public/headcount/javascript"}))
  (handler/site (route/resources "/vendor" {:root "public/vendor"}))
  (handler/site (route/resources "/images" {:root "public/images"}))
  (handler/site (route/resources "/angular-htmls" {:root "public/angular-htmls"}))
  (handler/site (route/resources "/utilisation/partials" {:root "public/utilisation/partials"}))
  (handler/site (route/resources "/revenue/partials" {:root "public/revenue/partials"}))
  (handler/site (route/resources "/invoice/partials" {:root "public/invoice/partials"}))
  (handler/site (route/resources "/headcount/partials" {:root "public/headcount/partials"}))
  (handler/site (route/resources "/production/javascript" {:root "public/production/javascript"}))
  (handler/site (route/resources "/production/partials" {:root "public/production/partials"})))

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

(def main
  (ring-app system/system))
