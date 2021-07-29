const Ws = require("ws");
((Ws) => {
	const server = new Ws.Server({ port: 8000 });

	const init = () => {
		bindEvent();
	};
	function bindEvent() {
		server.on("open", handleOpen);
		server.on("close", handleClose);
		server.on("error", handleError);
		server.on("connection", handleConnection);
	}
	function handleOpen() {
		console.log("1");
	}
	function handleClose() {
		console.log("2");
	}
	function handleError() {
		console.log("3");
	}
	function handleConnection(ws) {
		ws.on("message", handleMessage);
		// console.log("4");
	}
	function handleMessage(msg) {
		server.clients.forEach((c) => {
			c.send(msg);
		});
		// console.log("msg", msg);
	}
	init();
})(Ws);
