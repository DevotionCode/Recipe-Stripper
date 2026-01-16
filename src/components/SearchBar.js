"use client";

import styles from "./SearchBar.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function SearchBar({ value, onChange }) {
    const { t } = useLanguage();

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                className={styles.input}
                placeholder={t("searchPlaceholder")}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
