function App() {
  return (
    <StylesProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </QueryClientProvider>
    </StylesProvider>
  );
}

export default App;
