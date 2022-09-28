# Sonarqube

1. 使用 `docker` 安装 `sonarqube`, `sonar-scanner`.

   ```bash
   docker pull sonarqube
   docker pull sonarsource/sonar-scanner-cli
   ```

2. 启动 `sonarqube` 服务

   ```bash
   docker run \
       --rm \
       -e SONAR_HOST_URL="http://${SONARQUBE_URL}" \
       -e SONAR_LOGIN="myAuthenticationToken" \
       -v "${YOUR_REPO}:/usr/src" \
       sonarsource/sonar-scanner-cli
   ```

3. 启动 `sonar-scanner` 扫描文件.

   ```bash
   docker run -v "/D/JiNiuGitLab/cifm-cms:/usr/src" sonarsource/sonar-scanner-cli -D"sonar.projectKey=test" -D"sonar.sources=/usr/src" -D"sonar.exclusions=**/node_modules/**" -D"sonar.host.url=http://172.10.100.85" -D"sonar.login=eafe5360106cc83e35c140a50273b06309a65b10"
   ```

   

---

参考文档:

[aonarqube][https://docs.sonarqube.org/latest/setup/install-server/]

[sonar-scanner][https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/]