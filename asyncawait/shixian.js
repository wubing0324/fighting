function asyncToGen(genFunction) {
    return function (...args) {
      const gen = genFunction.apply(this, args);
      return new Promise((resolve, reject) => {
        function step(key, arg) {
          let genResult;
          try {
            genResult = gen[key](arg);
          } catch (err) {
            return reject(err);
          }
          const { value, done } = genResult;
          if (done) {
            return resolve(value);
          }
          return Promise.resolve(value).then(
            (val) => {
              step('next', val);
            },
            (err) => {
              step('throw', err);
            },
          );
        }
        step('next');
      });
    };
  }
  const getData = () => new Promise(resolve => setTimeout(() => resolve('data'), 1000));
  function* testG() {
    const data = yield getData();
    console.log('data: ', data);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
  }
  
  const gen = asyncToGen(testG);
  gen().then(res => console.log(res));
  

  function asyncToGen(genFunction) {
    return function(...args) {
        const gen = genFunction.apply(this, args)
        return new Promise((resolve, reject) => {
            const step = (key, args) => {
                let genResult;
                try {
                    genResult = gen[key](arg);
                  } catch (err) {
                    return reject(err);
                  }
                const { value, done } = genResult

                if (done) {
                    return resolve(value)
                }
                Promise.resolve(value).then((res) => {
                    step('next', res)
                }, (err) => {
                    step('throw', err)
                })
            }
            step('next')
        })
    }
  }