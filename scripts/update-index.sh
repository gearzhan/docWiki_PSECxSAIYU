#!/bin/bash
# 自动更新 wikilink _index.json 文件
# Auto-update wikilink _index.json files

set -e  # 错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_FILE="$PROJECT_ROOT/docs/wikilink-config.json"

echo "📚 Wikilink Index Update Script"
echo "================================"
echo ""

# 检查配置文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}❌ Config file not found: $CONFIG_FILE${NC}"
    exit 1
fi

# 读取配置文件中的 indexFolders
INDEX_FOLDERS=$(node -p "JSON.parse(require('fs').readFileSync('$CONFIG_FILE', 'utf8')).indexFolders.join(' ')" 2>/dev/null)

if [ -z "$INDEX_FOLDERS" ]; then
    echo -e "${RED}❌ No indexFolders defined in config${NC}"
    exit 1
fi

echo "📂 Folders to index:"
for folder in $INDEX_FOLDERS; do
    echo "   - $folder"
done
echo ""

# 处理每个文件夹
UPDATED_COUNT=0

for folder in $INDEX_FOLDERS; do
    FULL_PATH="$PROJECT_ROOT/$folder"
    INDEX_FILE="$FULL_PATH/_index.json"

    if [ ! -d "$FULL_PATH" ]; then
        echo -e "${YELLOW}⚠️  Folder not found: $folder${NC}"
        continue
    fi

    echo "🔍 Scanning: $folder"

    # 查找所有 .md 文件（相对于文件夹的路径）
    cd "$FULL_PATH"
    MD_FILES=$(find . -name "*.md" -type f | sed 's|^\./||' | sort)

    # 统计文件数量
    FILE_COUNT=$(echo "$MD_FILES" | grep -c . || echo "0")

    # 生成 JSON 内容
    TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

    # 构建 JSON 文件列表（使用数组）
    JSON_ARRAY="["
    FIRST=true
    while IFS= read -r file; do
        if [ -n "$file" ]; then
            if [ "$FIRST" = true ]; then
                JSON_ARRAY="$JSON_ARRAY
    \"$file\""
                FIRST=false
            else
                JSON_ARRAY="$JSON_ARRAY,
    \"$file\""
            fi
        fi
    done <<< "$MD_FILES"
    JSON_ARRAY="$JSON_ARRAY
  ]"

    # 生成完整的 JSON 内容
    JSON_CONTENT=$(cat <<EOF
{
  "version": "1.0",
  "generatedAt": "$TIMESTAMP",
  "files": $JSON_ARRAY
}
EOF
)

    # 检查是否有变化
    if [ -f "$INDEX_FILE" ]; then
        # 提取旧文件列表进行比较（忽略 generatedAt 字段）
        OLD_FILES=$(node -p "JSON.parse(require('fs').readFileSync('$INDEX_FILE', 'utf8')).files.join('\\n')" 2>/dev/null || echo "")
        NEW_FILES=$(echo "$MD_FILES")

        if [ "$OLD_FILES" = "$NEW_FILES" ]; then
            echo -e "   ${GREEN}✓${NC} No changes ($FILE_COUNT files)"
            continue
        fi
    fi

    # 写入文件
    echo "$JSON_CONTENT" > "$INDEX_FILE"

    echo -e "   ${GREEN}✓ Updated${NC} ($FILE_COUNT files)"
    UPDATED_COUNT=$((UPDATED_COUNT + 1))

    cd "$PROJECT_ROOT"
done

echo ""
echo "================================"
if [ $UPDATED_COUNT -eq 0 ]; then
    echo -e "${GREEN}✨ All indexes are up to date${NC}"
else
    echo -e "${GREEN}✨ Updated $UPDATED_COUNT index file(s)${NC}"
fi
