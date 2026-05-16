# Floravelle Botanics 准上线替换清单

这份站点当前是“准上线假跑通版”。前台、询盘路径、后台仪表盘、询盘列表、产品目录都已经使用统一假数据跑通。正式上线前，请把下面字段替换为真实信息。

## 1. 品牌与公司信息

- `brandName`: 当前为 `Floravelle Botanics`
- `companyName`: 当前为 `Floravelle Botanics Co., Ltd.`
- `companySummary`: 当前为仿真花外贸供应商通用描述
- Logo、品牌字体、品牌色
- 公司所在地、营业主体、出口主体

主要替换位置：

- `assets/js/site-data.js`
- 所有页面的 `<title>` 和 `<meta name="description">`

## 2. 联系方式

- `supportEmail`: 当前为 `sales@floravelle-botanics.com`
- `whatsapp`: 当前为 `+86 138 0000 7826`
- 联系页响应时间说明
- 后续真实表单收件人或 CRM 接口

主要替换位置：

- `assets/js/site-data.js`
- 未来真实表单服务配置

## 3. 产品与分类数据

- 产品真实名称
- 真实 SKU / 型号
- 产品真实尺寸
- 材质说明
- 包装方式
- MOQ
- 打样规则
- 真实产品图片和场景图

主要替换位置：

- `assets/js/site-data.js`
- `assets/images/generated/`
- 后续真实产品数据源

## 4. 询盘与后台数据

- 当前后台使用假询盘和本地浏览器演示提交记录
- 正式上线时需要接真实表单提交服务
- 后台需要接真实数据库、登录和权限
- 仪表盘统计需要改为真实访问和询盘数据

主要替换位置：

- `assets/js/site-data.js`
- `assets/js/site.js`
- `assets/js/admin.js`

## 5. 正式上线前检查

- 全站邮箱、WhatsApp、公司名无假数据残留
- 产品图和产品描述能对应真实货品
- Contact 表单能真实送达
- 后台登录和数据权限已启用
- Cloudflare Pages 或其他托管平台部署的是最新正确站点
- 手机端首页、分类页、产品页、联系页、后台页都检查过
