'use client'
import Checkbox from '../checkbox/checkbox'
import { TAccidental, TKey } from '@/utility/types'
import styles from './key-selector.module.css'
import Button from '../button/button'
import { keysAtom } from '@/state/atoms'
import { useImmerAtom } from 'jotai-immer'
import NaturalIcon from '@/inline-svg/natural-icon'
import SharpIcon from '@/inline-svg/sharp-icon'
import FlatIcon from '@/inline-svg/flat-icon'

export default function KeySelector() {

  const [selectedKeys, setSelectedKeys] = useImmerAtom(keysAtom);

  const handleChange = ({ key, accidental }: { key: TKey, accidental: TAccidental }) => {
    setSelectedKeys(draft => {
      draft[accidental][key] = !draft[accidental][key];
    });
  };

  const handleAccidentalClick = (accidental: TAccidental) => {
    const keysStates = Object.values(selectedKeys[accidental]);
    if (keysStates.includes(false)) {
      setSelectedKeys(draft => {
        draft[accidental] = { c: true, d: true, e: true, f: true, g: true, a: true, b: true };
      });
    } else {
      setSelectedKeys(draft => {
        draft[accidental] = { c: false, d: false, e: false, f: false, g: false, a: false, b: false };
      });
    }
  }; // using object literals instead of loops to keep function readable and simple

  return (
    <article>
      <h3 className={styles.heading}>Тональности</h3>
      <form className={styles.form}>
        <table className={styles.table}>
          <thead className={styles.tableHeading}>
            <tr>
              <td className={styles.keysHeading}></td>
              {/* <th scope="col"><Button onClick={() => handleAccidentalClick('natural')}>&#9838;</Button></th> */}
              <th scope="col">
                <Button onClick={() => handleAccidentalClick('natural')} addStyles={styles.accidentalButton}>
                  <NaturalIcon title="Натуральные тональности" width={24} height={24} addStyles={styles.accidentalIcon} />
                </Button>
              </th>
              <th scope="col">
                <Button onClick={() => handleAccidentalClick('sharp')} addStyles={styles.accidentalButton}>
                  <SharpIcon title="Тональности с диезом" width={24} height={24} addStyles={styles.accidentalIcon} />
                </Button>
              </th>
              <th scope="col">
                <Button onClick={() => handleAccidentalClick('flat')} addStyles={styles.accidentalButton}>
                  <FlatIcon title="Тональности с бемолем" width={22} height={22} addStyles={styles.accidentalIcon} />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={styles.key} scope="row">C</th>
              <td>
                <label htmlFor="c-natural" className="srOnly">До</label>
                <Checkbox
                  id="c-natural"
                  name="c-natural"
                  checked={selectedKeys.natural.c}
                  onChange={() => handleChange({ key: 'c', accidental: 'natural' })}
                />
              </td>
              <td>
                <label htmlFor="c-sharp" className="srOnly">До диез</label>
                <Checkbox
                  id="c-sharp"
                  name="c-sharp"
                  checked={selectedKeys.sharp.c}
                  onChange={() => handleChange({ key: 'c', accidental: 'sharp' })}
                />
              </td>
              <td>
                <label htmlFor="c-flat" className="srOnly">До бемоль</label>
                <Checkbox
                  id="c-flat"
                  name="c-flat"
                  checked={selectedKeys.flat.c}
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
                  checked={selectedKeys.natural.d}
                  onChange={() => handleChange({ key: 'd', accidental: 'natural' })}
                />
              </td>
              <td>
                <label htmlFor="d-sharp" className="srOnly">Ре диез</label>
                <Checkbox
                  id="d-sharp"
                  name="d-sharp"
                  checked={selectedKeys.sharp.d}
                  onChange={() => handleChange({ key: 'd', accidental: 'sharp' })}
                />
              </td>
              <td>
                <label htmlFor="d-flat" className="srOnly">Ре бемоль</label>
                <Checkbox
                  id="d-flat"
                  name="d-flat"
                  checked={selectedKeys.flat.d}
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
                  checked={selectedKeys.natural.e}
                  onChange={() => handleChange({ key: 'e', accidental: 'natural' })}
                />
              </td>
              <td>
                <label htmlFor="e-sharp" className="srOnly">Ми диез</label>
                <Checkbox
                  id="e-sharp"
                  name="e-sharp"
                  checked={selectedKeys.sharp.e}
                  onChange={() => handleChange({ key: 'e', accidental: 'sharp' })}
                />
              </td>
              <td>
                <label htmlFor="e-flat" className="srOnly">Ми бемоль</label>
                <Checkbox
                  id="e-flat"
                  name="e-flat"
                  checked={selectedKeys.flat.e}
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
                  checked={selectedKeys.natural.f}
                  onChange={() => handleChange({ key: 'f', accidental: 'natural' })}
                />
              </td>
              <td>
                <label htmlFor="f-sharp" className="srOnly">Фа диез</label>
                <Checkbox
                  id="f-sharp"
                  name="f-sharp"
                  checked={selectedKeys.sharp.f}
                  onChange={() => handleChange({ key: 'f', accidental: 'sharp' })}
                />
              </td>
              <td>
                <label htmlFor="f-flat" className="srOnly">Фа бемоль</label>
                <Checkbox
                  id="f-flat"
                  name="f-flat"
                  checked={selectedKeys.flat.f}
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
                  checked={selectedKeys.natural.g}
                  onChange={() => handleChange({ key: 'g', accidental: 'natural' })}
                />
              </td>
              <td>
                <label htmlFor="g-sharp" className="srOnly">Соль диез</label>
                <Checkbox
                  id="g-sharp"
                  name="g-sharp"
                  checked={selectedKeys.sharp.g}
                  onChange={() => handleChange({ key: 'g', accidental: 'sharp' })}
                />
              </td>
              <td>
                <label htmlFor="g-flat" className="srOnly">Соль бемоль</label>
                <Checkbox
                  id="g-flat"
                  name="g-flat"
                  checked={selectedKeys.flat.g}
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
                  checked={selectedKeys.natural.a}
                  onChange={() => handleChange({ key: 'a', accidental: 'natural' })}
                />
              </td>
              <td>
                <label htmlFor="a-sharp" className="srOnly">Ля диез</label>
                <Checkbox
                  id="a-sharp"
                  name="a-sharp"
                  checked={selectedKeys.sharp.a}
                  onChange={() => handleChange({ key: 'a', accidental: 'sharp' })}
                />
              </td>
              <td>
                <label htmlFor="a-flat" className="srOnly">Ля бемоль</label>
                <Checkbox
                  id="a-flat"
                  name="a-flat"
                  checked={selectedKeys.flat.a}
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
                  checked={selectedKeys.natural.b}
                  onChange={() => handleChange({ key: 'b', accidental: 'natural' })}
                />
              </td>
              <td>
                <label htmlFor="b-sharp" className="srOnly">Си диез</label>
                <Checkbox
                  id="b-sharp"
                  name="b-sharp"
                  checked={selectedKeys.sharp.b}
                  onChange={() => handleChange({ key: 'b', accidental: 'sharp' })}
                />
              </td>
              <td>
                <label htmlFor="b-flat" className="srOnly">Си бемоль</label>
                <Checkbox
                  id="b-flat"
                  name="b-flat"
                  checked={selectedKeys.flat.b}
                  onChange={() => handleChange({ key: 'b', accidental: 'flat' })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </article>
  )
}