import { useState } from 'react'
import Checkbox from '../checkbox/checkbox'
import { TAccidental, TKey } from '@/utility/types'
import styles from './key-selector.module.css'

export default function KeySelector() {
  // Make properties for keys non-optional 
  const [selectedKeys, setSelectedKeys] = useState<{ [accidental in TAccidental]: { [key in TKey]?: boolean } }>({ natural: { c: false }, sharp: {}, flat: {} });

  const handleChange = ({ key, accidental }: { key: TKey, accidental: TAccidental }) => {
    setSelectedKeys({
      ...selectedKeys,
      [accidental]: { ...selectedKeys[accidental], [key]: !selectedKeys[accidental][key] }
    });
  }
  return (
    <form className={styles.form}>
      <table className={styles.table}>
        <thead className={styles.tableHeading}>
          <tr>
            <td className={styles.keysHeading}></td>
            <th scope="col">&#9838;</th>
            <th scope="col">&#9839;</th>
            <th scope="col">&#9837;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={styles.key} scope="row">C</th>
            {/*Remove 'as boolean'*/}
            <td>
              <label htmlFor="c-natural" className="srOnly">До</label>
              <Checkbox
                id="c-natural"
                name="c-natural"
                checked={selectedKeys.natural.c as boolean}
                onChange={() => handleChange({ key: 'c', accidental: 'natural' })}
              />
            </td>
            <td>
              <label htmlFor="c-sharp" className="srOnly">До диез</label>
              <Checkbox
                id="c-sharp"
                name="c-sharp"
                checked={selectedKeys.sharp.c as boolean}
                onChange={() => handleChange({ key: 'c', accidental: 'sharp' })}
              />
            </td>
            <td>
              <label htmlFor="c-flat" className="srOnly">До бемоль</label>
              <Checkbox
                id="c-flat"
                name="c-flat"
                checked={selectedKeys.flat.c as boolean}
                onChange={() => handleChange({ key: 'c', accidental: 'flat' })}
              />
            </td>
          </tr>
          <tr>
            <th className={styles.key} scope="row">D</th>
            <td>
              <label htmlFor="d-natural" className="srOnly">Ре</label>
              <Checkbox
                id="d-natural"
                name="d-natural"
                checked={selectedKeys.natural.d as boolean}
                onChange={() => handleChange({ key: 'd', accidental: 'natural' })}
              />
            </td>
            <td>
              <label htmlFor="d-sharp" className="srOnly">Ре диез</label>
              <Checkbox
                id="d-sharp"
                name="d-sharp"
                checked={selectedKeys.sharp.d as boolean}
                onChange={() => handleChange({ key: 'd', accidental: 'sharp' })}
              />
            </td>
            <td>
              <label htmlFor="d-flat" className="srOnly">Ре бемоль</label>
              <Checkbox
                id="d-flat"
                name="d-flat"
                checked={selectedKeys.flat.d as boolean}
                onChange={() => handleChange({ key: 'd', accidental: 'flat' })}
              />
            </td>
          </tr>
          <tr>
            <th className={styles.key} scope="row">E</th>
            <td>
              <label htmlFor="e-natural" className="srOnly">Ми</label>
              <Checkbox
                id="e-natural"
                name="e-natural"
                checked={selectedKeys.natural.e as boolean}
                onChange={() => handleChange({ key: 'e', accidental: 'natural' })}
              />
            </td>
            <td>
              <label htmlFor="e-sharp" className="srOnly">Ми диез</label>
              <Checkbox
                id="e-sharp"
                name="e-sharp"
                checked={selectedKeys.sharp.e as boolean}
                onChange={() => handleChange({ key: 'e', accidental: 'sharp' })}
              />
            </td>
            <td>
              <label htmlFor="e-flat" className="srOnly">Ми бемоль</label>
              <Checkbox
                id="e-flat"
                name="e-flat"
                checked={selectedKeys.flat.e as boolean}
                onChange={() => handleChange({ key: 'e', accidental: 'flat' })}
              />
            </td>
          </tr>
          <tr>
            <th className={styles.key} scope="row">F</th>
            <td>
              <label htmlFor="f-natural" className="srOnly">Фа</label>
              <Checkbox
                id="f-natural"
                name="f-natural"
                checked={selectedKeys.natural.f as boolean}
                onChange={() => handleChange({ key: 'f', accidental: 'natural' })}
              />
            </td>
            <td>
              <label htmlFor="f-sharp" className="srOnly">Фа диез</label>
              <Checkbox
                id="f-sharp"
                name="f-sharp"
                checked={selectedKeys.sharp.f as boolean}
                onChange={() => handleChange({ key: 'f', accidental: 'sharp' })}
              />
            </td>
            <td>
              <label htmlFor="f-flat" className="srOnly">Фа бемоль</label>
              <Checkbox
                id="f-flat"
                name="f-flat"
                checked={selectedKeys.flat.f as boolean}
                onChange={() => handleChange({ key: 'f', accidental: 'flat' })}
              />
            </td>
          </tr>
          <tr>
            <th className={styles.key} scope="row">G</th>
            <td>
              <label htmlFor="g-natural" className="srOnly">Соль</label>
              <Checkbox
                id="g-natural"
                name="g-natural"
                checked={selectedKeys.natural.g as boolean}
                onChange={() => handleChange({ key: 'g', accidental: 'natural' })}
              />
            </td>
            <td>
              <label htmlFor="g-sharp" className="srOnly">Соль диез</label>
              <Checkbox
                id="g-sharp"
                name="g-sharp"
                checked={selectedKeys.sharp.g as boolean}
                onChange={() => handleChange({ key: 'g', accidental: 'sharp' })}
              />
            </td>
            <td>
              <label htmlFor="g-flat" className="srOnly">Соль бемоль</label>
              <Checkbox
                id="g-flat"
                name="g-flat"
                checked={selectedKeys.flat.g as boolean}
                onChange={() => handleChange({ key: 'g', accidental: 'flat' })}
              />
            </td>
          </tr>
          <tr>
            <th className={styles.key} scope="row">A</th>
            <td>
              <label htmlFor="a-natural" className="srOnly">Ля</label>
              <Checkbox
                id="a-natural"
                name="a-natural"
                checked={selectedKeys.natural.a as boolean}
                onChange={() => handleChange({ key: 'a', accidental: 'natural' })}
              />
            </td>
            <td>
              <label htmlFor="a-sharp" className="srOnly">Ля диез</label>
              <Checkbox
                id="a-sharp"
                name="a-sharp"
                checked={selectedKeys.sharp.a as boolean}
                onChange={() => handleChange({ key: 'a', accidental: 'sharp' })}
              />
            </td>
            <td>
              <label htmlFor="a-flat" className="srOnly">Ля бемоль</label>
              <Checkbox
                id="a-flat"
                name="a-flat"
                checked={selectedKeys.flat.a as boolean}
                onChange={() => handleChange({ key: 'a', accidental: 'flat' })}
              />
            </td>
          </tr>
          <tr>
            <th className={styles.key} scope="row">B</th>
            <td>
              <label htmlFor="b-natural" className="srOnly">Си</label>
              <Checkbox
                id="b-natural"
                name="b-natural"
                checked={selectedKeys.natural.b as boolean}
                onChange={() => handleChange({ key: 'b', accidental: 'natural' })}
              />
            </td>
            <td>
              <label htmlFor="b-sharp" className="srOnly">Си диез</label>
              <Checkbox
                id="b-sharp"
                name="b-sharp"
                checked={selectedKeys.sharp.b as boolean}
                onChange={() => handleChange({ key: 'b', accidental: 'sharp' })}
              />
            </td>
            <td>
              <label htmlFor="b-flat" className="srOnly">Си бемоль</label>
              <Checkbox
                id="b-flat"
                name="b-flat"
                checked={selectedKeys.flat.b as boolean}
                onChange={() => handleChange({ key: 'b', accidental: 'flat' })}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}