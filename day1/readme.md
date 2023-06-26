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

4. useMemo

5. useCallback
