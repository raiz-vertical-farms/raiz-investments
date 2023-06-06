# Raiz Investments

### Copy dev db to production

Activate ssh tunnel to production server using Wireguard, then:

```
scp prisma/data.db root@raiz-investments.internal:/data/sqlite.db
```
