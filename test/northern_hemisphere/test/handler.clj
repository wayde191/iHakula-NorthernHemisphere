(ns northern-hemisphere.test.handler
  (:use clojure.test
        [clj-http.core :only []]
        ring.mock.request
        environ.core)
  (:require [northern-hemisphere.handler :as handler]
            [net.cgrand.enlive-html :as html]
            [clojure.data.json :as json]
            [clj-time.core :refer [date-time do-at]]))

(deftest test-piwik-host
  (testing "Should not return any hostname, if not defined"
    (with-redefs [environ.core/env {}]
      (is (= nil (handler/piwik-host)))))

  (testing "Should return hostname defined in PIWIK_HOST"
    (with-redefs [environ.core/env {:PIWIK_HOST "ihakula.com"}]
      (is (= "ihakula.com"
            (handler/piwik-host))))))
