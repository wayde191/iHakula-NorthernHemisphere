(def version (if-let [version (System/getenv "GO_PIPELINE_COUNTER")]
               (str version "." (System/getenv "GO_STAGE_COUNTER"))
               "0.1.0"))

(defn envhash [keys]
  (into {} (map #(let [key %] [key (System/getenv key)]) keys)))

(defproject northern-hemisphere version
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
                 [ring/ring-core "1.2.0"]
                 [enlive "1.1.6"]
                 [environ "0.4.0"]
                 [org.clojars.scsibug/feedparser-clj "0.4.0"]
                 [org.clojure/data.zip "0.1.1"]
                 [org.clojure/data.json "0.2.3"]
                 [org.clojure/data.csv "0.1.2"]
                 [org.clojure/core.incubator "0.1.3"]
                 [pjstadig/humane-test-output "0.6.0"]
                 ]
  :plugins [[lein-ring "0.9.1"]
            [lein-shell "0.4.0"]
            [lein-rpm "0.0.5"]
            [jonase/eastwood "0.1.4"]
            [lein-cloverage "1.0.2"]]
  :ring {:handler northern-hemisphere.handler/app}
;         :main northern-hemisphere.core}
  :aot [utils.manifest]
  :profiles {:dev {:dependencies [[ring-mock "0.1.5"]
                                  [clj-http-fake "1.0.1"]
                                  [ring-server "0.2.8"]
                                  [clj-webdriver "0.6.1"]
                                  [com.github.detro.ghostdriver/phantomjsdriver "1.1.0"]
                                  [midje "1.5.1"]]}}
  :target-path "target/%s"

  :rpm {:name "northern-hemisphere"
        :summary "Northern Hemisphere Web Application"
        :copyright "iHakula Inc"
        :workarea "target/rpm"
        :requires ["java-1.7.0-openjdk"]
        :preinstall {:scriptFile "src/rpm/pre-install"}
        :preremove {:scriptFile "src/rpm/pre-uninstall"}
        :mappings [{:directory "/usr/lib/northern-hemisphere"
                    :sources {:source
                              [{:location ~(str "target/uberjar+uberjar/northern-hemisphere-" version "-standalone.jar")
                                :destination "northern-hemisphere-standalone.jar"}]}}
                   {:directory "/usr/bin"
                    :filemode "755"
                    :directoryIncluded false
                    :sources {:source [{:location "src/rpm/northern-hemisphere"}]}}
                   {:directory "/etc/init"
                    :filemode "644"
                    :directoryIncluded false
                    :sources {:source [{:location "src/rpm/northern-hemisphere.upstart"
                                        :destination "northern-hemisphere.conf"}]}}
                   {:directory "/etc/default"
                    :filemode "0400"
                    :directoryIncluded false
                    :sources {:source [{:location "src/rpm/northern-hemisphere.default"
                                        :destination "northern-hemisphere"}]}}]}

  :clean-targets ^{:protect false} [:target-path :compile-path
                                    "resources/public/css"
                                    "resources/public/vendor"
                                    "bower_components"
                                    ".cache"]

  :auto-clean false

  :aliases {"bower" ["shell" "bower" "install"]
            "sass" ["do" ["bower"] ["shell" "sass" "--update" "resources/sass/:resources/public/css/"]]
            "js-compile" ["shell" "grunt" "compile"]
            "resources" ["do" ["sass"] ["js-compile"]]
            "wrap-package" ["shell" "src/scripts/wrap-package" ~version]
            "package" ["do" ["resources"] ["compile"] ["ring" "uberjar"] ["rpm"]]
            "clean-test" ["test"]
            "clean-package" ["do" ["clean"] ["package"]]
            })
