import benchmark from "benchmark";

export namespace Benchmark {
    export interface IOutput {
        name: string;
        json: number;
        memoize: number;
        closure: number;
        manual: number;
    }

    export function prepare<T>(
        getter: () => T,
        stringify: (input: T) => string,
        createStringifer: (input: T) => string,
        handWriting: (input: T) => string,
    ) {
        const data: T = getter();
        stringify(data);

        const suite: benchmark.Suite = new benchmark.Suite();
        suite.add("json", () => JSON.stringify(data));
        suite.add("memoize", () => stringify(data));
        suite.add("closure", () => createStringifer(data));
        suite.add("manual", () => handWriting(data));

        return () => {
            const output: IOutput = {
                name: getter.name,
                json: 0,
                memoize: 0,
                closure: 0,
                manual: 0,
            };

            suite.run();
            suite.map((elem: benchmark) => {
                (output as any)[elem.name] = elem.count / elem.times.elapsed;
            });

            return output;
        };
    }
}