# icb-cli
## 安装
```
npm i -g icb-cli
```
### 查看版本
```
icb -V
```
### 查看帮助命令
```
icb -h
```
### 添加schema
```
icb add [name]
```
### 删除schema
```
icb remove [name]
```
### 运行schema命令
```
icb run -c [schema] [command]
```
#### 例如
```
icb add @vue/cli
icb run -c vue create test
```