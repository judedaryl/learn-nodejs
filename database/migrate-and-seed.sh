#!/bin/bash
set -e

DELAY_SECONDS=5

echo "Waiting ${DELAY_SECONDS} seconds..."
sleep $DELAY_SECONDS

echo "Running schema migrations"
/liquibase/liquibase \
  --changeLogFile=changelog.xml \
  --url=jdbc:postgresql://$POSTGRES_HOST:5432/$POSTGRES_DB \
  --username=$POSTGRES_USER \
  --password=$POSTGRES_PASSWORD \
  --liquibaseSchemaName=public \
  --logLevel=warning \
  updateTestingRollback

echo "Running seed data migrations"
cd seed
/liquibase/liquibase \
  --changeLogFile=changelog.xml \
  --url=jdbc:postgresql://$POSTGRES_HOST:5432/$POSTGRES_DB \
  --username=$POSTGRES_USER \
  --password=$POSTGRES_PASSWORD \
  --liquibaseSchemaName=public \
  --logLevel=warning \
  update

echo ""
echo ""
echo "██╗  ██╗ █████╗ ███████╗██╗  ██╗███████╗██╗     ███████╗███████╗████████╗"
echo "██║  ██║██╔══██╗██╔════╝██║  ██║██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝"
echo "███████║███████║███████╗███████║█████╗  ██║     █████╗  █████╗     ██║   "
echo "██╔══██║██╔══██║╚════██║██╔══██║██╔══╝  ██║     ██╔══╝  ██╔══╝     ██║   "
echo "██║  ██║██║  ██║███████║██║  ██║██║     ███████╗███████╗███████╗   ██║   "
echo "╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝╚══════╝   ╚═╝   "
echo "                                                                         "
echo "██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗        "
echo "██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝        "
echo "██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗          "
echo "██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝          "
echo "██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗        "
echo "╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝        "
echo "                                                                         "
echo "██╗███╗   ██╗██╗████████╗██╗ █████╗ ██╗     ██╗███████╗███████╗██████╗   "
echo "██║████╗  ██║██║╚══██╔══╝██║██╔══██╗██║     ██║╚══███╔╝██╔════╝██╔══██╗  "
echo "██║██╔██╗ ██║██║   ██║   ██║███████║██║     ██║  ███╔╝ █████╗  ██║  ██║  "
echo "██║██║╚██╗██║██║   ██║   ██║██╔══██║██║     ██║ ███╔╝  ██╔══╝  ██║  ██║  "
echo "██║██║ ╚████║██║   ██║   ██║██║  ██║███████╗██║███████╗███████╗██████╔╝  "
echo "╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚══════╝╚═════╝   "
echo ""
echo ""                                                                     