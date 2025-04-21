import mqtt, { MqttClient } from 'mqtt';

const brokerUrl: string = 'mqtt://18.191.91.135:1883';

const options: mqtt.IClientOptions = {
    username: 'saulssl',
    password: '232312',
    clientId: `node-client-${Math.random().toString(16).slice(2, 10)}`,
};

const client: MqttClient = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
    console.log('Conectado al broker MQTT');

    client.subscribe('test/topic', { qos: 1 }, (err) => {
        if (err) {
            console.error('Error al suscribirse:', err);
        } else {
            console.log('Suscrito a test/topic');
        }
    });
});

client.on('message', (topic: string, message: Buffer) => {
    console.log(`Mensaje recibido en '${topic}': ${message.toString()}`);
});

client.on('error', (error: Error) => {
    console.error('Error en la conexión MQTT:', error);
});

client.on('close', () => {
    console.log('Conexión cerrada con el broker');
});

client.on('reconnect', () => {
    console.log('Intentando reconectar...');
});

client.on('offline', () => {
    console.warn('Cliente MQTT está offline');
});

export default client;