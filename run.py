# run.py
# Khi chạy (Pyodide/hoặc Python local) file này sẽ in lời chúc và một trái tim ASCII.
msg = [
"Mẹ ơi, con biết cuộc đời không lúc nào phẳng lặng. Có những lúc con vụng về, có những lúc con làm mẹ lo lắng.",
"Con cảm ơn mẹ vì những hy sinh thầm lặng, vì từng bữa cơm, từng lời dạy, và cả những đêm thức để lo cho con.",
"Hôm nay con chỉ muốn nói: con yêu mẹ, con trân trọng mọi điều mẹ đã dành cho con. Mong mẹ luôn mạnh khỏe, an yên và cười nhiều nhé.",
"Con hứa sẽ cố gắng, sẽ yêu thương mẹ như mẹ đã yêu thương con."
]

for i, s in enumerate(msg,1):
    print(f"{i}. {s}")

print("\n" + "="*38 + "\n")
print("   .-''''-.\n  /  .--.  \\\n /  /    \\  \\\n |  |    |  |\n \\  \\    /  /\n  '._'--'_.'\n")
print("Gửi mẹ: Con yêu mẹ nhiều lắm! ❤️")
