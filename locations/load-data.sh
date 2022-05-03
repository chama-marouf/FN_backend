for f in *.json
do
  curl -X POST -H "Content-Type: application/json" -d "@$f" http://localhost:4040/location/add
  echo " <- $f"
done
