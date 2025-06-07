import express from "express";
import rootRouter from "./src/routers/root.router";
import sequelize from "./src/common/config/sequelize.config";
import { BadrequestException } from "./src/common/helpers/exception.helper";
import { PORT } from "./src/common/constant/init.constant";

const app = express();

// Middleware để parse JSON
app.use(express.json());

// Middleware để gắn sequelize vào req
app.use((req, res, next) => {
    req.sequelize = sequelize;
    next();
});

// Đăng ký router
app.use("/api", rootRouter);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    if (err instanceof BadrequestException) {
        return res.status(err.code || 400).json({ message: err.message });
    }
    return res.status(500).json({ message: "Lỗi server nội bộ" });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
