# 물리엔진 (Physics)

## 특징

- Rapier [레이피어] 라이브러리를 사용함
- Rust 프로그래밍 언어로 코딩되었고 WebAssembly를 통해 JS 라이브러리로써 사용됨
- 순수하게 JS만으로 개발된 물리엔진 라이브러리보다 퍼포먼스가 뛰어남
- https://dimforge.com/
- R3F에서는 React Three Rapier를 통해 구현되어 사용될 수 있음(three.js와의 통합성이 높아짐)
- https://rapier.rs/docs/user_guides/javascript/getting_started_js/
- https://rapier.rs/javascript3d/index.html
- https://github.com/pmndrs/react-three-rapier#readme

패키지 설치
` npm install @react-three/rapier`

## 강체 (Rigid Box)

RigidBody로 mesh를 감싸주면 이제 해당 mesh는 물리법칙에 따르는 mesh로 변경.

- 위에서 떨어지거나
- 부딫혀서 위치와 속도를 바뀐다거나 (위치와 속도를 가지는)

```
<RigidBody>
       <mesh position={[0, 4, 0]}>
           <sphereGeometry />
           <meshStandardMaterial color="#82E0AA" />
         </mesh>
</RigidBody>
```

## 충돌체(Collider)

- 강체(Rigid Body)의 물리적 형상으로 충돌 계산에 사용됨
- 충돌체를 지정하지 않을 경우 정육면체 default
- 자동으로 mesh 와 position에 맞춰서 생성됨

### 사용자 지정 충돌체

1. RigidBody에서 colliders를 false지정
2. mesh에서 지정한 position, rotation, scale을 RigidBody에 지정해야합니다.

```
        <RigidBody
          colliders={false}
          position={[1, 1, -0.25]}
          rotation={[Math.PI / 3, 0, 0]}
          scale={[2, 1, 1]}
        >
          {/* 사용자 지정 colider (충돌체) */}
          <CuboidCollider args={[1.5, 1.5, 1.5]} />
          <mesh position={[0, 1, -0.25]} rotation={[Math.PI * 0.3, 0, 0]}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="#F9E79F" />
          </mesh>
        </RigidBody>
```

- cf) CuboidCollider [https://rapier.rs/javascript3d/classes/Cuboid.html]

## Physics Force

물리적인 힘
[https://rapier.rs/javascript3d/classes/RigidBody.html]

- RigidBody를 ref로 지정하고 .current로 속성을 보면 친절하게 나오지 않고 생성자쪽으 보면 속성 값이 나오므로 (applyImpulse, applyTorqueImpulse ...)

- applyImpulse
  - 클릭 시 위로 튀어오름
  - 멈춘 후 몇조 기다리고 다시 클릭하면 반응 없음(sleep mode) - 물리엔진이 메모리 소모를 덜하기 위해

rust로 작성되어 친절하게 보여주진 않는다.

```
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
```

### 강체의 성질

- 중력

```
<!-- 어디 막힐때까지 오른쪽 이동 -->
<Physics gravity={[1,0,0]}>

<!-- gravityScale로 중력 영향을 강체 개별적으로 조절. 음수를 주면 반대로  -->
<RigidBody colliders="ball" position={ [ - 1.5, 2, 0 ] } gravityScale={0.5}>

```

- 반발력(Restitution)

  - 충돌 시 반발해서 튀기는 성질로 default 0

```
<RigidBody type="fixed" restitution={1}>
```

- 마찰력(Friction)

  - 표면 마찰력으로 미끄러지는 물체가 이 값이 클수록 빨리 멈춤
  - default 0.7
  - 바닥도 마찰력 0, 띄우며 돌아가는 물체도 0이면 얼음바닥과 같으므로 지면에서도 계속 돌아감

```
<RigidBody ref={cube} position={[1.5, 2, 0]} friction={0}>
    <mesh castShadow onClick={ cubeJump }>
        <boxGeometry />
        <meshStandardMaterial color="#F9E79F" />
    </mesh>
</RigidBody>

<RigidBody type="fixed" friction={0}>
    <mesh receiveShadow position-y={-1.25} rotation-x={THREE.MathUtils.degToRad(-90)} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="#5D6D7E" />
    </mesh>
</RigidBody>
```

- 질량(Mass)
  - 질량이 클수록 움직일 때 더 큰 힘이 필요
  - mass 값을 변경해보면서 큐브 클릭시 적게 움직임
- 강체의 타입

  - fixed : 예제에서 하단 지면은 fix로
  - dynamic : 위의 구, 박스 등은 dynamic

  - kinematic : kinematic으로 지정하면 중력 등 물리 법칙의 속성을 받지 않음.

  - cf) fixed, dynamic은 위치와 회전이 물리법칙에 의해 변경되는 타입

### 충돌 이벤트(Collision Event)

RigidBody에서 제공하는 충돌 이벤트

- onCollisionEnter: 강체가 무엇인가와 충돌
- onCollisionExit: 강체가 무언가와 붙어 있다 분리될 때

```
<RigidBody name="상자" ref={cube} position={[1.5, 2, 0]} friction={0} onCollisionEnter={ collisionEvent }>

```

### RigidBody의 수면 모드

- 수면 모드로 전환된 강체는 물리 연산을 안해서 시뮬레이션 연산 속도 향상
- 다른 강체에 부딛히거나 applyImpulse와 같은 메서드 호출할 때까지

```
// 아래와 같은 코드를 추가해준다.
    if (cube.current.isSleeping()) cube.current.wakeUp();
```


<hr>

