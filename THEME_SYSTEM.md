# 🎨 Theme System

Система тем автоматически сохраняет выбор пользователя и восстанавливает его при следующем запуске приложения.

## ✨ Возможности

- **Автосохранение**: Выбор темы автоматически сохраняется в AsyncStorage
- **Три режима**: Light, Dark, System (следует системной теме)
- **Быстрый переключатель**: Компонент для быстрого переключения между светлой и темной темой
- **Полный переключатель**: Компонент с выбором всех трех режимов
- **Загрузочный экран**: Красивый индикатор загрузки при инициализации темы

## 🚀 Использование

### Основной хук

```tsx
import { useTheme } from 'theme/ThemeContext';

const { colors, mode, isDark, setThemeMode } = useTheme();
```

### Утилитарный хук

```tsx
import { useThemeUtils } from 'hooks/useThemeUtils';

const { toggleTheme, setLight, setDark, setSystem, isLight, isSystemMode } =
  useThemeUtils();
```

### Компоненты

**Быстрый переключатель (Light/Dark)**

```tsx
import { QuickThemeToggle } from 'components/QuickThemeToggle';

<QuickThemeToggle size="small" showLabel={false} />;
```

**Полный переключатель (Light/Dark/System)**

```tsx
import { ThemeToggle } from 'components/ThemeToggle';

<ThemeToggle />;
```

## 📱 Автосохранение

Выбор темы автоматически сохраняется в AsyncStorage с ключом `@theme_mode` и восстанавливается при запуске приложения.

## 🛠 Структура файлов

```
src/
├── theme/
│   ├── ThemeContext.tsx     # Основной контекст темы
│   ├── colors.ts           # Цветовые схемы
│   └── ...
├── hooks/
│   └── useThemeUtils.ts    # Утилитарный хук
├── components/
│   ├── ThemeToggle.tsx         # Полный переключатель
│   ├── QuickThemeToggle.tsx    # Быстрый переключатель
│   └── ThemeLoadingScreen.tsx  # Загрузочный экран
└── utils/
    └── storage.ts          # Утилиты для работы с хранилищем
```

## 💡 Преимущества

- Минимум кода для максимальной функциональности
- Автоматическое сохранение без дополнительных действий
- Красивые готовые компоненты
- Поддержка системной темы
- TypeScript поддержка
