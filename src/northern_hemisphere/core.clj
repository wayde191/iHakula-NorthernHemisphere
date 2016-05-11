(ns northern-hemisphere.core
  (:gen-class)
  (:require [northern-hemisphere.mysql :as mysql]))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (mysql/list-users "Hello, World!"))
