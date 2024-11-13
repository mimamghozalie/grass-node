const WebSocket = require("ws");

const { HttpsProxyAgent } = require("https-proxy-agent");
const { randomUUID } = require("crypto");
const { faker } = require("@faker-js/faker");

const proxies = [
  //   "socks://erzotlic:jc4haw7l45b6@198.23.239.134:6540",
  //   "socks://erzotlic:jc4haw7l45b6@207.244.217.165:6712",
  //   "socks://erzotlic:jc4haw7l45b6@107.172.163.27:6543",
  //   "socks://erzotlic:jc4haw7l45b6@64.137.42.112:5157",
  //   "socks://erzotlic:jc4haw7l45b6@173.211.0.148:6641",
  //   "socks://erzotlic:jc4haw7l45b6@161.123.152.115:6360",
  //   "socks://erzotlic:jc4haw7l45b6@167.160.180.203:6754",
  //   "socks://erzotlic:jc4haw7l45b6@154.36.110.199:6853",
  //   "socks://erzotlic:jc4haw7l45b6@173.0.9.70:5653",
  //   "socks://erzotlic:jc4haw7l45b6@173.0.9.209:5792",
  "socks://reizel5uva7j4w0pir-session-4w7xvm87:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-aa3aqp7s:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-0jyluxr3:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-yxews07d:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-0tn4yb1i:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-68pp8g41:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-4gq56hnd:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-c1skyvs0:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ytb9y9dq:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-3pkjsdja:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-rerb0ckw:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-gjdrmewl:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-cw8u6otk:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-sjkrf07b:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ujqgrquf:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-996c9z66:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-rcx8czhg:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-2kzctsxz:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-vh0zsgf7:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-iqxam3bg:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-blm78yvk:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-dy9wqazp:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-qssxskhb:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-9cv8xmat:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-rc8vr087:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-0has6u7t:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-pjbxi52o:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-n9dsubp3:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-xv64o5hz:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-w2dhx68p:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-x6foc81k:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ymq5yyit:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-bx03jj4m:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ksvl3df0:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ehcs7esa:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-4scmwccd:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-gjn4b063:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-6jhgicjw:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-n5z58vfn:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-8jxgg9si:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-5irqp4l5:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-fe7peioo:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-rcv1iaag:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-xo7v6n8u:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-g9nkxx8n:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-g7b282l6:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ts41av5h:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-868gt9kd:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-llhh5rra:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-6i5fkq96:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-3crj90ks:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-2xcp15yg:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-b5y8ei16:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-5ptky15g:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-fmx6n8wu:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-dq4fawzf:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-u7gexmvw:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ufuyjba0:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-xdhj0x5y:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-j8p836x5:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-pt0b4ehs:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-37t1pl6g:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-rhcwg6zh:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-vqu6rdef:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-jw2mn3d6:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-731vw33n:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-pudskoec:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-j67cp9z0:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-oie1k56m:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-duhnwt7l:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-1u26pp3a:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-8jo3e72w:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-0u1vkh5w:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-cl7tr859:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-z2nszvrv:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-lw0a3l77:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-khuobv4b:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-ced1bogd:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-lv3fs8wj:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-2jul80yx:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-6539whbj:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-swigqkbe:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-yccvu0c6:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-tvj9xcny:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-jkyfl6q4:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-isnw9p7u:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-fm8hpnlb:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-n6k2yhuk:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-6feftpwv:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-va1jmxf2:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-1xq4pvkd:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-0vvfcuar:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-53ayktw6:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-b3x0nky3:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-yidlxzef:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-w626uez8:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-akz8k3xp:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-41cfsn78:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-8i4rrlkj:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
  "socks://reizel5uva7j4w0pir-session-bxhb2p41:rbbbf7xnzzfp0pr0@isp.proxies.fo:10808",
];

async function ConnectGrass(userId, proxy) {
  // Proxy configuration
  //   const proxyAgent = new HttpsProxyAgent(
  //     "http://erzotlic:jc4haw7l45b6@198.23.239.134:6540"
  //   );
  const proxyAgent = new HttpsProxyAgent(proxy);

  // WebSocket configuration
  const wsOptions = {
    agent: proxyAgent,
    headers: {
      // Optional custom headers
      "User-Agent": "WebSocket Client",
    },
    // Optional WebSocket protocol version
    protocolVersion: 13,
    // Handle self-signed certificates
    rejectUnauthorized: false,
  };

  const grassUrl = "wss://proxy2.wynd.network:4650/";

  // Create WebSocket connection
  const ws = new WebSocket(grassUrl, wsOptions);

  // Connection event handlers
  ws.on("open", function open() {
    console.log("Connected to WebSocket server through proxy");
  });

  const sendPing = async () => {
    const payloadPing = {
      id: randomUUID(),
      version: "1.0.0",
      action: "PING",
      data: {},
    };
    ws.send(JSON.stringify(payloadPing));
    console.log("ping sended!");
  };

  ws.on("message", function incoming(message) {
    try {
      console.log(message.toString());
      const msgData = JSON.parse(message.toString());

      if (msgData.action == "AUTH") {
        let payloadAuth = {
          id: msgData.id,
          origin_action: "AUTH",
          result: {
            browser_id: randomUUID(),
            user_id: userId,
            user_agent: faker.internet.userAgent(),
            timestamp: new Date().getTime() / 1000,
            device_type: "desktop",
            version: "4.26.2",
            // extension_id: "ilehaonighjijnmpnagapkhpcdbhclfg",
          },
        };

        const msg = JSON.stringify(payloadAuth);
        ws.send(msg);

        setTimeout(() => {
          sendPing();
        }, 100 * 1000);
      }
    } catch (error) {
      console.error("error receiving message", error);
    }
  });

  ws.on("error", function error(err) {
    console.error("WebSocket error:");
  });

  ws.on("close", function close() {
    setTimeout(() => {
      ConnectGrass(userId, proxy);
    }, 5000);
    console.log("Disconnected from WebSocket server");
  });
}

for (const proxy of proxies) {
  ConnectGrass("2o9kD8IyZhglZhgWImJfd5q0ctA", proxy);
}
