## Цель
Сделать border-radius у `.input` (визуальный контрол) у `DialogSelect` и `TreeDialogSelect` таким же, как у обычного `Select`.

## Текущее состояние
- `Select.module.scss` (главный контрол): `border-radius: 0.6rem` (≈ 6px)
- `DialogSelect.module.scss` строка 17 (`.input`): `border-radius: 4px`
- `TreeDialogSelect.module.scss` строка 17 (`.input`): `border-radius: 4px`

## Изменения
1. `src/lib/components/DialogSelect/DialogSelect.module.scss` — в селекторе `.input` заменить `border-radius: 4px;` → `border-radius: 0.6rem;`
2. `src/lib/components/TreeDialogSelect/TreeDialogSelect.module.scss` — в селекторе `.input` заменить `border-radius: 4px;` → `border-radius: 0.6rem;`

Остальные радиусы (диалог 18px, поиск 999px, таблица 10px, кнопки в футере) не трогаем — они не относятся к самому контролу селекта.
