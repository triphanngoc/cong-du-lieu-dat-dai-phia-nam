# PROJECT_BLUEPRINT: trungtamdulieudatdaiphianam
He thong cung cap du lieu thong tin dat dai

## 1. TECH STACK (GOI Y)
- Backend: .NET 8 Web API hoac Java Spring Boot (RESTful, JWT)
- Database: PostgreSQL (co the them PostGIS) hoac SQL Server
- Frontend: Angular 16+ hoac React (Vite), UI: Material/Ant Design + Tailwind
- Reverse proxy: Nginx / IIS
- File storage: local/NFS hoac S3-compatible (MinIO)

## 2. ERD (CHINH)
- users(id, username, password_hash, full_name, email, phone, user_type, is_active, created_at, last_login)
- roles(id, name, desc)
- user_roles(user_id, role_id)

- co_quan(id, ten, ma_co_quan, dia_chi, so_dien_thoai, email)
- linh_vuc(id, ten, ma_linh_vuc)

- thu_tuc_hanh_chinh(id, ma_thu_tuc, ten_thu_tuc, mo_ta, linh_vuc_id FK, co_quan_thuc_hien_id FK, muc_do_dich_vu, thoi_han_giai_quyet, is_active)
- dich_vu_cong(id, thu_tuc_id FK, slug, huong_dan_url, is_active)

- ho_so(id, ma_ho_so, thu_tuc_id FK, user_id FK nullable, ho_ten_nguoi_nop, don_vi_to_chuc, email, so_dien_thoai, dia_chi, muc_dich_su_dung_id FK, kenh_nop, trang_thai_hien_tai, ngay_nop, han_giai_quyet, ngay_hoan_thanh, ghi_chu_chung)
- ho_so_chi_tiet_yeu_cau(id, ho_so_id FK, loai_du_lieu_id FK, khu_vuc_tinh_id, khu_vuc_huyen_id, khu_vuc_xa_id, ty_le, nam, ghi_chu)
- ho_so_trang_thai_lich_su(id, ho_so_id FK, trang_thai, thoi_gian, nguoi_thuc_hien_id FK, ghi_chu)
- ho_so_tap_tin(id, ho_so_id FK, loai, file_name, file_path, size_bytes, created_at)

- thanh_toan(id, ho_so_id FK, so_tien, phuong_thuc, ma_giao_dich_gateway, trang_thai, thoi_gian)
- system_settings(key, value, note)
- audit_logs(id, user_id, action, entity_type, entity_id, timestamp, ip_address, detail)

## 3. BACKEND MODULES
- Auth module: dang ky, dang nhap, refresh token, phan quyen role
- Catalog module: linh_vuc, co_quan, thu_tuc_hanh_chinh, dich_vu_cong
- Ho_so module: tao ho_so, cap nhat, tra cuu, timeline trang thai, tap tin
- Payment module: tinh phi, tao giao dich, callback payment gateway
- File module: upload/download file (giay to, ket qua)
- Admin module: quan ly thu_tuc, ho_so, thanh_toan, nguoi_dung, system_settings, audit_logs

## 4. API ROUTES (SUON CHINH)

AUTH
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/refresh
- POST /api/v1/auth/logout

CATALOG (public)
- GET /api/v1/linh-vuc
- GET /api/v1/co-quan
- GET /api/v1/thu-tuc?linh_vuc_id=&keyword=&is_active=
- GET /api/v1/thu-tuc/:id
- GET /api/v1/dich-vu-cong?thu_tuc_id=&linh_vuc_id=
- GET /api/v1/dich-vu-cong/:id

CATALOG (admin)
- POST /api/v1/admin/thu-tuc
- PUT /api/v1/admin/thu-tuc/:id
- DELETE /api/v1/admin/thu-tuc/:id
- POST /api/v1/admin/dich-vu-cong
- PUT /api/v1/admin/dich-vu-cong/:id

HO SO (public/user)
- POST /api/v1/ho-so          (tao ho so moi)
- GET  /api/v1/ho-so/:maHoSo  (tra cuu ho so public)
- GET  /api/v1/me/ho-so       (danh sach ho so cua user dang nhap)
- GET  /api/v1/me/ho-so/:id   (chi tiet ho so cua user)

HO SO (admin)
- GET  /api/v1/admin/ho-so?status=&thu_tuc_id=&from=&to=&can_bo_id=
- GET  /api/v1/admin/ho-so/:id
- PUT  /api/v1/admin/ho-so/:id
- POST /api/v1/admin/ho-so/:id/trang-thai   (cap nhat trang thai + log history)
- POST /api/v1/admin/ho-so/:id/ket-qua      (gan file ket qua)

FILES
- POST /api/v1/files/upload          (multipart, tra ve file_id)
- GET  /api/v1/files/:id/download

PAYMENT
- GET  /api/v1/thanh-toan/ho-so/:maHoSo
- POST /api/v1/thanh-toan/ho-so/:maHoSo
- POST /api/v1/thanh-toan/callback   (gateway goi ve)

SYSTEM / ADMIN
- GET  /api/v1/admin/system-settings
- PUT  /api/v1/admin/system-settings
- GET  /api/v1/admin/audit-logs?user_id=&entity_type=&from=&to=

## 5. FRONTEND ROUTES (ANGULAR/REACT)

PUBLIC MODULE
- /                       -> Trang chu
- /dich-vu-cong          -> Danh sach DVCTT
- /dich-vu-cong/:id      -> Chi tiet DVCTT/thu tuc + nut "Nop ho so"
- /nop-ho-so/:thuTucId   -> Wizard tao ho so
- /tra-cuu-ho-so         -> Form tra cuu ho so
- /thanh-toan            -> Nhap ma ho so, thanh toan truc tuyen
- /huong-dan             -> Huong dan su dung
- /faq                   -> Cau hoi thuong gap

AUTH MODULE
- /auth/login
- /auth/register
- /auth/forgot-password

USER MODULE
- /user/profile          -> Thong tin ca nhan
- /user/ho-so            -> Danh sach ho so cua toi
- /user/ho-so/:id        -> Chi tiet ho so

ADMIN MODULE
- /admin/dashboard
- /admin/ho-so           -> So ho so truc tuyen
- /admin/ho-so/:id
- /admin/thu-tuc
- /admin/thu-tuc/new
- /admin/thu-tuc/:id/edit
- /admin/thanh-toan
- /admin/users
- /admin/settings
- /admin/audit-logs

## 6. FRONTEND FOLDER STRUCTURE (ANGULAR EXAMPLE)

src/app/
  core/
  shared/
  modules/
    public/
      home/
      dich-vu-cong/
      dich-vu-cong-detail/
      nop-ho-so/
      tra-cuu-ho-so/
      thanh-toan/
      huong-dan/
      faq/
    auth/
      login/
      register/
      forgot-password/
    user/
      profile/
      ho-so-list/
      ho-so-detail/
    admin/
      dashboard/
      ho-so/
      ho-so-detail/
      thu-tuc/
      thanh-toan/
      users/
      settings/
      audit-logs/
