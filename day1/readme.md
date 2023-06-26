# R3F(React Three Fiber) 이용한 interactive 3d 가상환경

## 1주차 - react 기본

1주차는 리액트 기본 진행

- vite로 번들링
- jsx
- react state / props
- react hooks

---

## react유연성의 근원, hook

1. useState
   상태(state)는 컴포넌트에서 변할 수 있는 속성

```
// state: 상태값을 읽을 수 있는 프로퍼티
// setState : 상태값을 변경할 수 있는 함수
const [state, setState] = useState(초기값)
```

```
function queryItemsFromDBMS() {
  console.log('dbms로부터 데이터 쿼리 중...') // 비동기 처리
  return ['홍길동1' , '일지매2']
}

// setState 인자로 콜백 전달할 수 있는데 컴포넌트가 여러번 렌더링 되더라도 콜백은 1번만 호출됨
// 무거운 초기값 정할때 콜백인자로 부면 효과적
  const [items, setItems] = useState(() => {return queryItemsFromDBMS()});

```

2. useEffect

- DOM 관점에서 mount/update/unmount 처리를 위함
  - mount: dom이 추가될 때
  - update: 컴포넌트 함수가 재호출되 dom내용이 갱신될 때
  - unmount: dom이 제거될 때
- 두번째 인자는 의존성 배열(dependancy array) 임
  - 지정하지 않으면 렌더링 될때마다 useEffect콜백이 호출됨
  - []로 지정해주면 처음 렌더링 시만 useEffect 콜백함수가 호출됨

```
useEffect(() => {

… // 의존성 배열의 항목 값이 변경될때마다(Mount, Update) 실행

return () => {
… // Unmount 될때 (또는) 새롭게 useEffect의 콜백함수가 실행되기전에 실행 (CleanUp Code)

}
}, [ … ])
```

3. useRef

- useRef값은 컴포넌트 전 생애에 걸쳐 유지되며 값을 변경할 수 있음
- 렌더링시 컴포넌트 함수 안의 변수는 다시 초기화 되는데 useRef는 값이 유지됨!
- ref값 변경되도 리렌더링 안됨
- state처럼 값을 저장하거나 DOM객체를 직접 참조하기 위해 사용됨

```
// countRef={current:값}
const countRef = useRef(초기값)
```

4. useMemo

- 최적화를 하기 위해 사용하는 hook
- 메모이제이션 (Memoization)
  :어떤 결과가 동일하면 메모리에 저장하고 이것을 다시 이용(캐싱)
- 의존성 배열의 구성 값이 변경되면 캐싱 결과를 무효화하고 다시 값을 계산하기 위해 콜백함수(useMemo의 첫번쨰 인자) 호출

```
  const value = useMemo(()=>{
    return …
  }, [ … ])
```

5. useCallback
- 컴포넌트 최적화를 위한 hook
- useMemo와 동일한데 차이면은 function을 메모이제이션 한다

```
const someFunction = useCallback(
  () => {
    console.log(`someFunc: number = ${number}`)
  return
  }, [number]
)
```

### forwardRef 고차함수
부모 컴포넌트에서 자식 컴포넌트 내부의 무언가를 useRef로 참조하고 싶을때 forwardRef를 사용

ChildComponent.jsx
```
import { forwardRef } from "react"
function ChildComponent(props, ref) {
return <input ref={ref} />
}
export default forwardRef(ChildComponent)

```

App.jsx
```
export function App() {
  const refInput = useRef()
  return (
  <div>
    <ChildComponent ref={refInput} />
    <button onClick={() => {refInput.current.focus()}}>
      Focus
    </button>
  </div>
  )
}

```