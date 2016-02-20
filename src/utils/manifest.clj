(ns utils.manifest)

(gen-class
  :name utils.manifest
  :methods [^{:static true} [implementationVersion [] String]])

(defn -implementationVersion
  []
  (or
    (.. (eval 'utils.manifest) (getPackage) (getImplementationVersion))
    "DEVELOPMENT"))
