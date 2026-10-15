# GitHub → Jenkins → SonarQube demo

Dự án mẫu phục vụ bài kiểm tra luồng CI. Mã Java có phép cộng và chia số nguyên; mã JavaScript định dạng điểm phần trăm. Đây là bài mẫu để minh họa hạ tầng, chưa phải ứng dụng của nhóm.

## Luồng chạy

1. Jenkins đọc `Jenkinsfile` và lấy mã nguồn từ GitHub.
2. Maven biên dịch Java, chạy JUnit, xuất coverage JaCoCo và đóng gói JAR.
3. Node chạy kiểm thử JavaScript, xuất báo cáo JUnit và LCOV.
4. SonarScanner gửi mã và báo cáo coverage đến SonarQube.
5. Jenkins nhận webhook; Quality Gate không đạt thì lần chạy thất bại.

## Cấu hình trên laptop

- Jenkins: http://localhost:8089
- SonarQube: http://localhost:9001/dashboard?id=cicd-github-demo
- Tools: `jdk21`, `maven3`, `node20`, `sonar-scanner`.
- Sonar server trong Jenkins: `SonarQube`, URL nội bộ `http://sonarqube:9000`, credential `sonar-token`.
- Sonar webhook: `http://jenkins:8080/sonarqube-webhook/`.
- Job Pipeline dùng **Pipeline script from SCM → Git**, nhánh `*/main`, Script Path `Jenkinsfile`.
- Bấm **Build Now** để chạy. Dự án không cấu hình tự chạy khi push và chưa có triển khai ứng dụng.

Token chỉ lưu trong Jenkins Credentials, không đưa lên GitHub.

## Kiểm thử riêng

Java (JDK 21 và Maven): vào `backend`, chạy `mvn test`.

JavaScript (Node 20+): vào `frontend`, chạy `npm run test:ci`.

JAR được lưu trong mục Artifacts của lần build thành công. Đây là thư viện mẫu, không phải web server.
