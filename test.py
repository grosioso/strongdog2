import os
import shutil
import re

# Define the base directory
base_dir = os.path.abspath('./swf/')
# The path to games.html (assumed to be in the current working directory)
games_html_path = os.path.abspath('./games.html')

# Ensure that games.html exists
if not os.path.exists(games_html_path):
    print(f"games.html not found at {games_html_path}")
    exit(1)

# Loop over each subdirectory in ./html/
for subdir_name in os.listdir(base_dir):
    subdir_path = os.path.join(base_dir, subdir_name)
    if os.path.isdir(subdir_path):
        index_html_path = os.path.join(subdir_path, 'index.html')
        if os.path.exists(index_html_path):
            # Read index.html
            with open(index_html_path, 'r', encoding='utf-8') as f:
                content = f.read()
            # Find the line with embedGame
            match = re.search(
                r"embedGame\(\s*['\"](.+?)['\"],\s*['\"](.+?)['\"]\s*\);",
                content,
                re.DOTALL,
            )
            if match:
                game_path = match.group(1)
                game_name = match.group(2)
                # Remove the old index.html
                os.remove(index_html_path)
                # Copy games.html to subdir as index.html
                new_index_html_path = os.path.join(subdir_path, 'index.html')
                shutil.copyfile(games_html_path, new_index_html_path)
                # Read the new index.html and replace placeholders
                with open(new_index_html_path, 'r', encoding='utf-8') as f:
                    new_content = f.read()
                new_content = new_content.replace('gamename', game_name)
                new_content = new_content.replace('gamepath', game_path)
                # Write back the modified content
                with open(new_index_html_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Processed game '{game_name}' in '{subdir_name}'")
            else:
                print(f"embedGame line not found in {index_html_path}")
        else:
            print(f"index.html not found in {subdir_path}")
    else:
        print(f"'{subdir_name}' is not a directory")
