const devKV = function () {
	const url = import.meta.env.VITE_KVDEV_URL;
	const key: never = import.meta.env.VITE_KVDEV_ACCESS_KEY;

	const get = async function (key) {
		const response = await fetch(`${url}${encodeURIComponent(key)}`, {
			headers: { 'Access-Key': key }
		});
		return await response.json();
	};

	const put = async function (key, value) {
		const response = await fetch(`${url}${encodeURIComponent(key)}`, {
			headers: { 'Access-Key': key },
			method: 'POST',
			body: JSON.stringify(value)
		});
		return await response.json();
	};

	const list = async function ({ prefix }) {
		const response = await fetch(`${url}?prefix=${prefix ? encodeURIComponent(prefix) : ''}`, {
			headers: { 'Access-Key': key }
		});
		return await response.json();
	};

	const del = async function (key, value) {
		const response = await fetch(`${url}${encodeURIComponent(key)}`, {
			headers: { 'Access-Key': key },
			method: 'DELETE'
		});
		return await response.json();
	};

	return {
		get,
		put,
		list,
		delete: del
	};
};

export const kv = function kv(platform: any) {
	return platform && platform.env ? platform.env.KV : devKV();
};
