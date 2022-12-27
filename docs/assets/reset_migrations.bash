rm -R -f ./migrations &&
pipenv run init &&
psql -U juan -c 'DROP DATABASE example;' || true &&
psql -U juan -c 'CREATE DATABASE example;' &&
psql -U juan -c 'CREATE EXTENSION unaccent;' -d example &&
pipenv run migrate &&
pipenv run upgrade