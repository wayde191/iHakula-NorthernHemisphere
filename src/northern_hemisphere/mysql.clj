(ns northern-hemisphere.mysql
  (:require [clojure.java.jdbc :as sql]))

(def db {:classname "com.mysql.jdbc.Driver"
         :subprotocol "mysql"
         :subname "//localhost:3306/ihakula_tea"
         :user "root"
         :password "Wayde191!"})

(defn list-users [table-name]
  (sql/with-connection db
    (sql/with-query-results rows
      ["select * from ih_product"]
      (println rows))))