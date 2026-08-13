import os
import sys

# Ensure backend package can be imported from root
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from backend.main import app
except ImportError:
    from main import app
