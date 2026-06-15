"""
Digital Clock — Python / Tkinter
Run: python clock.py
"""

import tkinter as tk
from datetime import datetime
import time

THEMES = {
    "Green":  {"fg": "#00ffb4", "bar": "#00e5ff"},
    "Blue":   {"fg": "#00b4ff", "bar": "#0066ff"},
    "Purple": {"fg": "#b400ff", "bar": "#ff00cc"},
    "Red":    {"fg": "#ff4444", "bar": "#ff8800"},
    "Gold":   {"fg": "#ffcc00", "bar": "#ff8800"},
}

BG = "#0a0a0f"


class DigitalClock:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title("Digital Clock")
        self.root.configure(bg=BG)
        self.root.resizable(False, False)
        self.theme = THEMES["Green"]
        self.colon_visible = True
        self._build_ui()
        self._tick()

    def _build_ui(self):
        pad = dict(bg=BG)

        # Date label
        self.date_lbl = tk.Label(self.root, text="", font=("Courier New", 12), fg="#00ffb4", **pad)
        self.date_lbl.pack(pady=(30, 0))

        # Time label
        self.time_lbl = tk.Label(self.root, text="00:00:00", font=("Courier New", 64, "bold"),
                                  fg="#00ffb4", **pad)
        self.time_lbl.pack(pady=10)

        # Seconds progress bar (canvas)
        bar_frame = tk.Frame(self.root, **pad)
        bar_frame.pack(fill="x", padx=60, pady=(0, 5))

        self.sec_canvas = tk.Canvas(bar_frame, height=6, bg="#1a1a2e", highlightthickness=0)
        self.sec_canvas.pack(fill="x")
        self.bar_rect = self.sec_canvas.create_rectangle(0, 0, 0, 6, fill="#00ffb4", outline="")

        # Timezone
        import time as _t
        tz = _t.tzname[0]
        self.tz_lbl = tk.Label(self.root, text=tz, font=("Courier New", 9), fg="#00ffb430", **pad)
        self.tz_lbl.pack(pady=(0, 10))

        # Theme buttons
        theme_frame = tk.Frame(self.root, **pad)
        theme_frame.pack(pady=(0, 30))
        for name, colors in THEMES.items():
            btn = tk.Button(
                theme_frame, text="  ", bg=colors["fg"], bd=0, relief="flat",
                width=2, height=1, cursor="hand2",
                command=lambda c=colors: self._set_theme(c)
            )
            btn.pack(side="left", padx=4)

    def _set_theme(self, colors: dict):
        self.theme = colors
        fg = colors["fg"]
        self.date_lbl.config(fg=fg)
        self.time_lbl.config(fg=fg)
        self.sec_canvas.itemconfig(self.bar_rect, fill=fg)

    def _tick(self):
        now = datetime.now()
        date_str = now.strftime("%A · %b %d, %Y").upper()
        sec = now.second
        colon = ":" if self.colon_visible else " "
        time_str = f"{now.strftime('%H')}{colon}{now.strftime('%M')}{colon}{now.strftime('%S')}"

        self.date_lbl.config(text=date_str)
        self.time_lbl.config(text=time_str)
        self.colon_visible = not self.colon_visible

        # Update bar
        self.sec_canvas.update_idletasks()
        w = self.sec_canvas.winfo_width()
        fill_w = int((sec / 59) * w)
        self.sec_canvas.coords(self.bar_rect, 0, 0, fill_w, 6)

        self.root.after(500, self._tick)


if __name__ == "__main__":
    root = tk.Tk()
    app = DigitalClock(root)
    root.mainloop()
