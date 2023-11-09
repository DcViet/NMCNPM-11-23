const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser'); // Import body-parser
const twilio = require('twilio');

// Sử dụng EJS làm template engine
app.set('view engine', 'ejs');

// Định nghĩa thư mục chứa template
app.set('views', __dirname + '/views');

// Sử dụng body-parser để xử lý dữ liệu từ biểu mẫu
app.use(bodyParser.urlencoded({ extended: true }));

// Định nghĩa route
app.get('/', (req, res) => {
  res.render('index', { title: 'Trang Chủ' });
});

// Xử lý GET request cho trang đặt xe
app.get('/booking', (req, res) => {
  res.render('booking', { title: 'Đặt Xeee' });
});

// Xử lý POST request cho trang đặt xe
app.post('/bookings', (req, res) => {
  // Lấy thông tin từ biểu mẫu
  const phone = req.body.phone;
  const address = req.body.address;
  const isVIP = req.body.vip === 'on'; // Kiểm tra xem ô chọn VIP có được chọn hay không

  // Thực hiện xử lý với thông tin đặt xe ở đây, ví dụ: lưu vào cơ sở dữ liệu, gửi thông báo, v.v.

  // Trả về phản hồi cho trình duyệt
  res.send('Yêu cầu đặt xe đã được ghi nhận. Cảm ơn!');
});


// Cấu hình Twilio bằng cách sử dụng Account SID và Auth Token
const client = new twilio('AC90b4cc7ee2368280208c73bd084f1e0a', 'eabaf36542eaccda2a0ca722bb703729');

// Xử lý cuộc gọi đến
app.post('/incoming-call', (req, res) => {
  // Xử lý cuộc gọi ở đây, ví dụ: thu thập thông tin, gửi cuộc gọi điều hướng, v.v.
  const response = new twilio.twiml.VoiceResponse();
  response.say('Xin chào! Chúng tôi đang xử lý cuộc gọi của bạn.');
  res.type('text/xml');
  res.send(response.toString());
});


// Định nghĩa một route để xử lý thông tin từ cuộc gọi
app.post('/incoming-call', (req, res) => {
  // Xử lý dữ liệu từ cuộc gọi ở đây
  const phone = req.body.From;
  const address = req.body.To;
  const isVIP = req.body.isVIP;

  // Thực hiện các xử lý cần thiết, ví dụ: lưu vào cơ sở dữ liệu, gửi tin nhắn, v.v.

  // Trả về phản hồi cho Twilio
  res.send('<Response><Say>Thank you for your call.</Say></Response>');
});

app.post('/schedule-booking', (req, res) => {
  // Kiểm tra xem khách hàng có phải là VIP không
  const isVIP = req.body.isVIP;

  if (isVIP) {
    // Xử lý đặt xe theo hẹn giờ cho khách hàng VIP
    // Lấy thông tin đặt xe, thời gian hẹn giờ, vị trí, v.v.
    // Thực hiện lưu vào cơ sở dữ liệu hoặc hệ thống đặt xe
    res.send('Đặt xe theo hẹn giờ thành công.');
  } else {
    res.status(403).send('Chỉ khách hàng VIP được phép đặt xe theo hẹn giờ.');
  }
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
