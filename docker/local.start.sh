#!/usr/bin/env ash

# write aliases:
echo "alias build=\"yarn build\"" >> /root/.ashrc
echo "alias install=\"yarn install\"" >> /root/.ashrc
echo "alias test=\"yarn test\"" >> /root/.ashrc
echo "alias watch=\"yarn start\"" >> /root/.ashrc

# apply aliases:
. /root/.ashrc

tail -f /dev/null
