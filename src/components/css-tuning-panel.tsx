"use client";

import { useEffect, useMemo, useState } from "react";

import {
  cssTuningBroadcastChannel,
  cssTuningControls,
  cssTuningStorageKey,
  cssTuningUpdateEvent,
  getDefaultCssTuningValues,
  normalizeCssTuningValues,
  type CssTuningValues,
} from "@/lib/css-tuning";

function readStoredValues(): CssTuningValues {
  try {
    const raw = window.localStorage.getItem(cssTuningStorageKey);

    return raw ? normalizeCssTuningValues(JSON.parse(raw) as CssTuningValues) : getDefaultCssTuningValues();
  } catch {
    return getDefaultCssTuningValues();
  }
}

function writeValues(values: CssTuningValues) {
  const normalizedValues = normalizeCssTuningValues(values);
  window.localStorage.setItem(cssTuningStorageKey, JSON.stringify(normalizedValues));

  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel(cssTuningBroadcastChannel);
    channel.postMessage(normalizedValues);
    channel.close();
  }

  window.dispatchEvent(new CustomEvent(cssTuningUpdateEvent, { detail: normalizedValues }));

  try {
    window.dispatchEvent(new StorageEvent("storage", { key: cssTuningStorageKey }));
  } catch {
    // BroadcastChannel plus the custom event above already cover same-tab updates.
  }
}

export function CssTuningPanel() {
  const [values, setValues] = useState<CssTuningValues>(() => getDefaultCssTuningValues());
  const groups = useMemo(
    () => Array.from(new Set(cssTuningControls.map((control) => control.group))),
    [],
  );

  useEffect(() => {
    setValues(readStoredValues());
  }, []);

  const updateValue = (id: string, value: string) => {
    setValues((currentValues) => {
      const nextValues = { ...currentValues, [id]: value };
      writeValues(nextValues);

      return nextValues;
    });
  };

  const resetValues = () => {
    const defaults = getDefaultCssTuningValues();
    setValues(defaults);
    writeValues(defaults);
  };

  return (
    <main className="css-tuning-page">
      <section className="css-tuning-shell">
        <div className="css-tuning-header">
          <div>
            <p className="section-kicker">Local CSS tuner</p>
            <h1>Hero CSS values</h1>
          </div>
          <div className="css-tuning-actions" aria-label="CSS tuning actions">
            <a href="/" target="_blank" rel="noreferrer" className="css-tuning-link">
              Home
            </a>
            <a href="/promotions" target="_blank" rel="noreferrer" className="css-tuning-link">
              Promotions
            </a>
            <button type="button" className="css-tuning-reset" onClick={resetValues}>
              Reset
            </button>
          </div>
        </div>

        <div className="css-tuning-grid">
          {groups.map((group) => {
            const groupHeadingId = `css-group-${group.toLowerCase().replace(/\s+/g, "-")}`;

            return (
              <section key={group} className="css-tuning-group" aria-labelledby={groupHeadingId}>
                <h2 id={groupHeadingId}>{group}</h2>
                <div className="css-tuning-fields">
                  {cssTuningControls
                    .filter((control) => control.group === group)
                    .map((control) => (
                      <label key={control.id} className="css-tuning-field">
                        <span>{control.label}</span>
                        <input
                          type="text"
                          value={values[control.id] ?? control.defaultValue}
                          placeholder={control.placeholder}
                          spellCheck={false}
                          onChange={(event) => updateValue(control.id, event.target.value)}
                        />
                        <code>{control.property}</code>
                      </label>
                    ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
