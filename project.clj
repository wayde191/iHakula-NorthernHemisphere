(defproject northern-hemisphere "0.1.0"
  :description "Northern Hemisphere - web app"
  :url "http://www.ihakula.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [compojure "1.1.6"]
                 [clj-http "2.1.0"]
                 [clj-http-s3 "0.3.0" :exclusions [clj-http]]
                 [clj-time "0.11.0"]
                 [ring/ring-json "0.2.0"]
                 [enlive "1.1.6"]
                 [environ "0.4.0"]
                 ]
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler northern-hemisphere.handler/app}
  :aot [utils.manifest]
  :profiles {:uberjar {:aot :all}}
  :main ^:skip-aot northern-hemisphere.core
  :target-path "target/%s"
  :aliases {"clean-test" ["test"]})
