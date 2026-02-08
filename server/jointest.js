import { io } from 'socket.io-client';

const [roomInput, serverUrlArg] = process.argv.slice(2);

if (!roomInput) {
	console.error('Usage: node jointest.js <roomTokenOrUrl> [serverUrl]');
	console.error('Example: node jointest.js abc123');
	console.error('Example: node jointest.js http://localhost:5173/room/abc123 http://localhost:5000');
	process.exit(1);
}

const serverUrl = serverUrlArg ?? 'http://localhost:5000';

const makeClient = (name) => {
	const socket = io(serverUrl, {
		transports: ['websocket'],
		timeout: 5000
	});

	socket.on('connect_error', (err) => console.error(`${name}: connect_error`, err?.message ?? err));
	socket.on('join-error', (msg) => console.error(`${name}: join-error`, msg));

	return socket;
};

const join = (socket, payload) => new Promise((resolve) => {
	socket.emit('join-room', payload, (ack) => {
		resolve(ack);
	});
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const run = async () => {
	const clientA = makeClient('A');
	const clientB = makeClient('B');

	// Wait for sockets to connect
	await Promise.race([
		Promise.all([
			new Promise((r) => clientA.once('connect', r)),
			new Promise((r) => clientB.once('connect', r))
		]),
		sleep(6000).then(() => { throw new Error('Timed out connecting to server'); })
	]);

	// Payload accepted by backend: string OR { url/token/roomUrl/room }
	await join(clientA, { url: roomInput });
	await join(clientB, { url: roomInput });

	// Give a moment for room-state broadcasts
	await sleep(500);

	clientA.disconnect();
	clientB.disconnect();
};

run().catch((err) => {
	console.error('Test failed:', err?.message ?? err);
	process.exit(1);
});
