# Glorzo-Player 创造属于自己的音乐播放器

> 尚处于早期阶段，持续开发中～

兴趣使然的项目。

> 名称 `Glorzo` 来自 [Rick and Morty](https://aliens.fandom.com/wiki/Glorzo) 中的星球，没有特定意义。

# develop

Glorzo-Player是一个简单的C/S架构的音乐播放软件，可以自定义曲库，自定义存储服务，自定义用户...一切由自己掌控。

## Glorzo Server

服务端使用express进行开发。想要本地运行服务，需要阅读源码配置好数据库和对象存储服务。

配置完成后，直接启动即可。

```
yarn dev:server
```

## Glorzo Player

Electron驱动的音乐播放器；采用TypeScript + React进行开发。

```
yarn desktop:serve

yarn desktop:start
```

# App截图

![截屏2023-09-01 23.22.48.png](https://s2.loli.net/2023/09/01/wSQj4kVFpxgK3ci.png)
