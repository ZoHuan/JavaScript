class Promise {
	// 构造方法
	constructor(executor) {
		// 添加属性
		this.PromiseState = "pending";
		this.PromiseResult = null;
		// 声明属性
		this.callbacks = [];
		// 保存实例对象的this的值
		const self = this;
		// resolve函数
		function resolve(data) {
			//判断状态
			if (self.PromiseState !== "pending") return;
			// 1.修改对象的状态(promiseState)
			self.PromiseState = "fulfilled"; // resolved
			// 2.设置对象的结果值(promiseResult)
			self.PromiseResult = data;
			// 调用成功的回调函数
			setTimeout(() => {
				self.callbacks.forEach((item) => {
					item.onResolved(data);
				});
			});
		}
		// reject函数
		function reject(data) {
			//判断状态
			if (self.PromiseState !== "pending") return;
			// 1.修改对象的状态(promiseState)
			self.PromiseState = "rejected"; // resolved
			// 2.设置对象的结果值(promiseResult)
			self.PromiseResult = data;
			// 调用失败的回调函数
			setTimeout(() => {
				self.callbacks.forEach((item) => {
					item.onRejected(data);
				});
			});
		}

		try {
			// 同步调用『执行器函数』
			executor(resolve, reject);
		} catch (e) {
			// 修改promise对象状态为『失败』
			reject(e);
		}
	}

	// then方法封装
	then(onResolved, onRejected) {
		const self = this;
		// 判断回调函数参数
		if (typeof onRejected !== "function") {
			onRejected = (reason) => {
				throw reason;
			};
		}
		if (typeof onResolved !== "function") {
			onResolved = (value) => value;
		}

		return new Promise((resolve, reject) => {
			// 封装函数
			function callback(type) {
				try {
					// 获取回调函数的执行结果
					let result = type(self.PromiseResult);
					//判断
					if (result instanceof Promise) {
						// 如果是Promise类型的对象
						result.then(
							(v) => {
								resolve(v);
							},
							(r) => {
								reject(r);
							}
						);
					} else {
						// 结果的对象状态为『成功』
						resolve(result);
					}
				} catch (e) {
					reject(e);
				}
			}
			// 调用回调函数 PromiseState
			if (this.PromiseState === "fulfilled") {
				setTimeout(() => {
					callback(onResolved);
				});
			}
			if (this.PromiseState === "rejected") {
				setTimeout(() => {
					callback(onRejected);
				});
			}
			// 判断pending状态
			if (this.PromiseState === "pending") {
				// 保存回调函数
				this.callbacks.push({
					onResolved: function () {
						callback(onResolved);
					},
					onRejected: function () {
						callback(onRejected);
					},
				});
			}
		});
	}
	// catch方法
	catch(onRejected) {
		return this.then(undefined, onRejected);
	}
	// resolve方法
	static resolve(value) {
		// 返回promise对象
		return new Promise((resolve, reject) => {
			if (value instanceof Promise) {
				value.then(
					(v) => {
						resolve(v);
					},
					(r) => {
						reject(r);
					}
				);
			} else {
				// 状态设置为成功
				resolve(value);
			}
		});
	}
	// reject方法
	static reject(reason) {
		return new Promise((resolve, reject) => {
			reject(reason);
		});
	}
	// all方法
	static all(promises) {
		// 返回结果为promise对象
		return new Promise((resolve, reject) => {
			// 声明变量
			let count = 0;
			let arr = [];
			// 遍历
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(
					(v) => {
						// 得知对象的状态是对象
						// 每个promise对象都成功
						count++;
						// 将当前promise对象成功的结果 存入到数组中
						arr[i] = v;
						// 判断
						if (count === promises.length) {
							// 修改状态
							resolve(arr);
						}
					},
					(r) => {
						reject(r);
					}
				);
			}
		});
	}
	// race方法
	static race(promises) {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < promises.length; i++) {
				promises[i].then(
					(v) => {
						// 修改返回对象的状态为『成功』
						resolve(v);
					},
					(r) => {
						// 修改返回对象的状态为『失败』
						reject(r);
					}
				);
			}
		});
	}
}
